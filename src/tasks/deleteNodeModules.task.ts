'use strict';
import * as vscode from 'vscode';
import { NODE_MODULES } from '../constants';
import { TaskName } from './taskName.enum';

export function deleteNodeModulesTask(packageName: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;

    return new vscode.Task(
        { type: "npm" },
        workSpaceFolder![0],
        TaskName.OBG_DELETE_NODE_MODULES,
        "npm",
        new vscode.ShellExecution(`Remove-Item -LiteralPath "${NODE_MODULES}" -Force -Recurse`,
            { cwd: "${workspaceFolder}\\packages\\" + packageName + "\\dist" }),
        undefined);
}