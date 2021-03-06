'use strict';
import * as vscode from 'vscode';
import { NODE_MODULES } from '../constants';
import { TaskName } from './taskName.enum';
import { checkPath } from '../service/file.service';

export function deleteNodeModulesTask(packageName: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const workPath = "${workspaceFolder}\\packages\\" + packageName + "\\dist";

    checkPath(workPath);

    return new vscode.Task(
        { type: "npm" },
        workSpaceFolder![0],
        TaskName.OBG_DELETE_NODE_MODULES,
        "npm",
        new vscode.ShellExecution(`Remove-Item -LiteralPath "${NODE_MODULES}" -Force -Recurse`,
            { cwd: workPath }),
        undefined);
}