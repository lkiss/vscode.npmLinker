'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';
import { CONFIGURATION_PROPERTY_PATH } from '../constants';
import { checkPath } from '../service/file.service';

export function linkPackageTask(packageName: string, targetPropery: string) {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const targetNodeModulesPath = vscode.workspace.getConfiguration().get(`${CONFIGURATION_PROPERTY_PATH}.${targetPropery}`);

    const workPath = `${targetNodeModulesPath}`;

    checkPath(workPath);

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