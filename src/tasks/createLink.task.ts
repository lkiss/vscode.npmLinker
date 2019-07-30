'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';
import { checkPath } from '../service/file.service';

export function createLinkTask(packageName: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const workPath = "${workspaceFolder}\\packages\\" + packageName + "\\dist";
    // for future
    // const workPath = "${workspaceFolder}\\dist\\libs\\" + packageName;

    checkPath(workPath);

    return new vscode.Task(
        { type: "npm", group: "OBG" },
        workSpaceFolder![0],
        TaskName.OBG_CREATE_LINK,
        "npm",
        new vscode.ShellExecution(
            "npm link",
            { cwd: workPath }),
        undefined);
}