'use strict';
import * as vscode from 'vscode';
import { SettingsValidator } from '../validation/settings.validator';
import { CONFIGURATION_PROPERTY_PATH } from '../constants';
import { ObgTaskProvider } from '../providers/obgTaskProvider';
import { TaskName } from '../tasks/taskName.enum';
import { getPackageName, createTasks } from '../utils';

export async function linkPackage(args: any) {

    if (!(await SettingsValidator.validateSettings())) {
        return;
    }

    let targetProperty = "";
    const configuration = vscode.workspace.getConfiguration();
    const targetNodeModulesFolder = configuration.get(`${CONFIGURATION_PROPERTY_PATH}`);
    const packageNames = Object.keys(targetNodeModulesFolder!);

    let pickerResult = await vscode.window.showQuickPick(packageNames, { canPickMany: false, onDidSelectItem: (item: string) => { targetProperty = item as string; } });

    if (!pickerResult) {
        return;
    }

    const targetFolder = configuration.get<string>(`${CONFIGURATION_PROPERTY_PATH}.${targetProperty}`);

    if (!targetFolder) {
        await vscode.window.showErrorMessage(`${targetProperty} path is not defined in configuration.`);
        return;
    }

    const disposable: vscode.Disposable[] = [];
    const packageName = getPackageName(args.fsPath);
    const tasks = createTasks(packageName, targetProperty);
    const taskProvider = new ObgTaskProvider(tasks);
    const providedTasks = await taskProvider.provideTasks();
    const deleteLinkTask = providedTasks!.find((task: any) => task.name === TaskName.OBG_DELETE_LINK);
    const createLinkTask = providedTasks!.find((task: any) => task.name === TaskName.OBG_CREATE_LINK);
    const deleteNodeModulesTask = providedTasks!.find((task: any) => task.name === TaskName.OBG_DELETE_NODE_MODULES);
    const linkTask = providedTasks!.find((task: any) => task.name === TaskName.OBG_LINK);

    await vscode.tasks.executeTask(deleteLinkTask!);

    vscode.tasks.onDidEndTask(async (task: any) => {
        task.execution.terminate();

        switch (task.execution.task.name) {
            case TaskName.OBG_DELETE_LINK: {
                await vscode.tasks.executeTask(createLinkTask!);
                break;
            }
            case TaskName.OBG_CREATE_LINK: {
                await vscode.tasks.executeTask(deleteNodeModulesTask!);
                break;
            }
            case TaskName.OBG_DELETE_NODE_MODULES: {
                await vscode.tasks.executeTask(linkTask!);
                break;
            }
            default: {
                disposable[0].dispose();
            }
        }

    }, undefined, disposable);
}