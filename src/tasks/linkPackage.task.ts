'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';
import { CONFIGURATION_PROPERTY_PATH } from '../constants';

export function linkPackageTask(packageName: string, targetPropery: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const targetNodeModulesPath = vscode.workspace.getConfiguration().get(`${CONFIGURATION_PROPERTY_PATH}.${targetPropery}`);

    return new vscode.Task(
        { type: "npm" },
        workSpaceFolder![0],
        TaskName.OBG_LINK,
        "npm",
        new vscode.ShellExecution(
            `npm link @obg\\${packageName}`,
            { cwd: `${targetNodeModulesPath}` }),
        undefined);
}