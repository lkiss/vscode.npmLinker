'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';

export function createLinkTask(packageName: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;

    return new vscode.Task(
        { type: "npm", group: "OBG" },
        workSpaceFolder![0],
        TaskName.OBG_CREATE_LINK,
        "npm",
        new vscode.ShellExecution(
            "npm link",
            { cwd: "${workspaceFolder}\\packages\\" + packageName + "\\dist" }),
        undefined);
}