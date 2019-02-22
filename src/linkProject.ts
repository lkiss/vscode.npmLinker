'use strict';
import * as vscode from 'vscode';
import { NODE_MODULES } from './constants';
import { ObgTaskProvider } from './obgTaskProvider';

export async function linkToTarget(args: any) {
    const configuration = vscode.workspace.getConfiguration(undefined, undefined);
    const nazgulPath = configuration.get("obg.targetNodeModules.nazgul");

    if (!nazgulPath) {
        vscode.window.showErrorMessage("Nazgul path is not defined in configuration");
    }

    const packageName = getPackageName(args.fsPath);

    const workSpaceFolder = vscode.workspace.workspaceFolders;

    const activeTasks = await vscode.tasks.fetchTasks({ type: "npm" });

    let deleteLinkTaskDefinition: vscode.Task;
    let createLinkTaskDefinition: vscode.Task;
    let deleteNodeModulesTaskDefinition: vscode.Task;
    let linkTaskDefinition: vscode.Task;

    deleteLinkTaskDefinition = new vscode.Task({ type: "npm" }, workSpaceFolder![0], "obg delete link", "npm", new vscode.ShellExecution(`npm rm --global @obg\\${packageName}`, { cwd: "${workspaceFolder}" }), undefined);
    createLinkTaskDefinition = new vscode.Task({ type: "npm" }, workSpaceFolder![0], "obg create link", "npm", new vscode.ShellExecution("npm link", { cwd: "${workspaceFolder}\\packages\\" + packageName + "\\dist" }), undefined);
    deleteNodeModulesTaskDefinition = new vscode.Task({ type: "npm" }, workSpaceFolder![0], "obg delete node_modules", "npm", new vscode.ShellExecution(`Remove-Item -LiteralPath "${NODE_MODULES}" -Force -Recurse`, { cwd: "${workspaceFolder}\\packages\\" + packageName + "\\dist" }), undefined);
    linkTaskDefinition = new vscode.Task({ type: "npm" }, workSpaceFolder![0], "obg link", "npm", new vscode.ShellExecution(`npm link @obg\\${packageName}`, { cwd: `${nazgulPath}` }), undefined);

    if (activeTasks.some(task => task.name.includes("obg"))) {
        deleteLinkTaskDefinition = activeTasks.find(task => task.name === "obg delete link")!;
        createLinkTaskDefinition = activeTasks.find(task => task.name === "obg create link")!;
        linkTaskDefinition = activeTasks.find(task => task.name === "obg link")!;
        deleteNodeModulesTaskDefinition = activeTasks.find(task => task.name === "obg delete node_modules")!;

        deleteLinkTaskDefinition.execution = new vscode.ShellExecution(`npm rm --global @obg\\${packageName}`, { cwd: "${workspaceFolder}" });
        createLinkTaskDefinition.execution = new vscode.ShellExecution("npm link", { cwd: "${workspaceFolder}\\packages\\" + packageName + "\\dist" });
        linkTaskDefinition.execution = new vscode.ShellExecution(`npm link @obg\\${packageName}`, { cwd: `${nazgulPath}\\${NODE_MODULES}\\@obg` });
        deleteNodeModulesTaskDefinition.execution = new vscode.ShellExecution(`Remove-Item -LiteralPath "${NODE_MODULES}" -Force -Recurse`, { cwd: "${workspaceFolder}\\packages\\" + packageName + "\\dist" });
    }
    else {
        vscode.tasks.registerTaskProvider("linkTaskProvider", new ObgTaskProvider([deleteLinkTaskDefinition, createLinkTaskDefinition, deleteNodeModulesTaskDefinition, linkTaskDefinition]));
    }

    // deleteLinkTaskDefinition.presentationOptions = { showReuseMessage: false, panel: vscode.TaskPanelKind.New };
    // createLinkTaskDefinition.presentationOptions = { showReuseMessage: false, panel: vscode.TaskPanelKind.New };
    // linkTaskDefinition.presentationOptions = { showReuseMessage: false, panel: vscode.TaskPanelKind.New };

    const test1 = await vscode.tasks.executeTask(deleteLinkTaskDefinition);

    vscode.tasks.onDidEndTask(async task => {
        switch (task.execution.task.name) {
            case "obg create link": {
                await vscode.tasks.executeTask(deleteNodeModulesTaskDefinition);
                return;
            }
            case "obg delete node_modules": {
                await vscode.tasks.executeTask(linkTaskDefinition);
                return;
            }
            case "obg delete link": {
                test1.terminate();
                await vscode.tasks.executeTask(createLinkTaskDefinition);
                return;
            }
        }
    });
}

function getPackageName(path: string) {
    const startIndex = path.indexOf("\\packages\\");
    const packageName = path.substring(startIndex + "\\packages\\".length);
    return packageName;
}