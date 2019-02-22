'use strict';
import * as vscode from 'vscode';

export async function npmInstall(args: any) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const configuration = vscode.workspace.getConfiguration(undefined, undefined);
    const nazgulPath = configuration.get("obg.targetNodeModules.nazgul");

    const installNazgulTask = new vscode.Task({ type: "install node modules" }, workSpaceFolder![0], "install", "npm", new vscode.ShellExecution("npm install", { cwd: nazgulPath as string }), undefined);

    vscode.tasks.onDidEndTask(async task => {
        task.execution.terminate();
    });

    await vscode.tasks.executeTask(installNazgulTask);
}