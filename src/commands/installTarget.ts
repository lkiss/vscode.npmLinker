'use strict';
import * as vscode from 'vscode';
import { SettingsValidator } from "../validation/settings.validator";
import { CONFIGURATION_PROPERTY_PATH } from "../constants";
import { ObgTaskProvider } from "../providers/obgTaskProvider";
import { TaskName } from "../tasks/taskName.enum";
import { getPackageName } from '../utils';
import { npmInstallTask } from '../tasks/npmInstall.task';

export async function installTarget(args: any) {
    if (!(await SettingsValidator.validateSettings())) {
        return;
    }

    let targetProperty = "";
    const configuration = vscode.workspace.getConfiguration();
    const targetNodeModulesFolder = configuration.get(`${CONFIGURATION_PROPERTY_PATH}`);
    const packageNames = Object.keys(targetNodeModulesFolder!);

    await vscode.window.showQuickPick(packageNames, { canPickMany: false, onDidSelectItem: item => { targetProperty = item as string; } });

    const targetFolder = configuration.get(`${CONFIGURATION_PROPERTY_PATH}.${targetProperty}`);

    if (!targetFolder) {
        await vscode.window.showErrorMessage(`${targetProperty} path is not defined in configuration.`);
        return;
    }

    const disposable: vscode.Disposable[] = [];
    const packageName = getPackageName(args.fsPath);
    const task = npmInstallTask(targetProperty, packageName);
    const taskProvider = new ObgTaskProvider([task]);
    const providedTasks = await taskProvider.provideTasks();
    const installTask = providedTasks!.find(task => task.name === TaskName.OBG_LINK);

    await vscode.tasks.executeTask(installTask!);

    vscode.tasks.onDidEndTask(async task => {
        task.execution.terminate();
    }, undefined, disposable);

}