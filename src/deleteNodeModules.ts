'use strict';
import * as vscode from 'vscode';

export async function deleteNodeModules(args: any) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const configuration = vscode.workspace.getConfiguration(undefined, undefined);
    const nazgulPath = configuration.get("obg.targetNodeModules.nazgul");

    const deleteTargetNodeModules = new vscode.Task({ type: "clear node modules" }, workSpaceFolder![0], "delete node_modules", "npm", new vscode.ShellExecution("rm -rf node_modules", { cwd: nazgulPath as string }), undefined);

    vscode.tasks.onDidEndTask(async task => {
        task.execution.terminate();
    });

    await vscode.tasks.executeTask(deleteTargetNodeModules);
}