'use strict';
import * as vscode from 'vscode';
import { TaskName } from './taskName.enum';
import { OBG, CONFIGURATION_PROPERTY_PATH } from '../constants';
import { checkPath } from '../service/file.service';

export function npmInstallTask(targetPropery: string, packageName = "") {
    const workSpaceFolder = vscode.workspace.workspaceFolders;
    const targetNodeModulesPath = vscode.workspace.getConfiguration().get<string>(`${CONFIGURATION_PROPERTY_PATH}.${targetPropery}`);

    const workPath = `${targetNodeModulesPath}`;
    checkPath(workPath);

    const shellExecution = packageName
        ? new vscode.ShellExecution(`npm install @${OBG}/${packageName}`, { cwd: targetNodeModulesPath })
        : new vscode.ShellExecution(`npm install`, { cwd: targetNodeModulesPath });

    return new vscode.Task(
        { type: "install node modules" },
        workSpaceFolder![0],
        TaskName.OBG_INSTALL,
        "npm",
        shellExecution,
        undefined);
}