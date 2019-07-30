'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';
import { checkPath } from '../service/file.service';

export function scopedBuildTask(packageName: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;

    const workPath = "${workspaceFolder}";

    checkPath(workPath);

    return new vscode.Task(
        { type: "npm" },
        workSpaceFolder![0],
        TaskName.OBG_SCOPED_BUILD,
        "npm",
        new vscode.ShellExecution(
            `npm run build -- --scope @obg\\${packageName}`,
            { cwd: workPath }),
        undefined);
}