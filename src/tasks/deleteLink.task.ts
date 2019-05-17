'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';

export function deleteLinkTask(packageName: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;

    return new vscode.Task(
        { type: "npm", group: "OBG", dependsOn: [TaskName.OBG_CREATE_LINK] },
        workSpaceFolder![0],
        TaskName.OBG_DELETE_LINK,
        "npm",
        new vscode.ShellExecution(`npm unlink --no-save @obg\\${packageName}`,
            { cwd: "${workspaceFolder}" }),
        undefined);
}