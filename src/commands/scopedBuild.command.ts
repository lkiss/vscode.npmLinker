'use strict';
import * as vscode from 'vscode';
import { SettingsValidator } from "../validation/settings.validator";
import { ObgTaskProvider } from "../providers/obgTaskProvider";
import { TaskName } from "../tasks/taskName.enum";
import { scopedBuildTask } from "../tasks/scopedBuild.task";
import { getPackageName } from '../utils';

export async function scopedBuildCommand(args: any) {
    if (!(await SettingsValidator.validateSettings())) {
        return;
    }

    const disposable: vscode.Disposable[] = [];
    const packageName = getPackageName(args.fsPath);
    const taskProvider = new ObgTaskProvider([scopedBuildTask(packageName)]);
    const providedTasks = await taskProvider.provideTasks();
    const scopedBuild = providedTasks!.find(task => task.name === TaskName.OBG_SCOPED_BUILD);

    await vscode.tasks.executeTask(scopedBuild!);

    vscode.tasks.onDidEndTask(async task => {
        task.execution.terminate();
    }, undefined, disposable);

}