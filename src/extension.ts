'use strict';
import * as vscode from 'vscode';
import { linkPackage } from './commands/linkPackage';
import { installTarget } from './commands/installTarget';
import { deleteTargetNodeModules } from './commands/deleteTargetNodeModules';
import { scopedBuildCommand } from './commands/scopedBuild.command';
export function activate(context: vscode.ExtensionContext) {

    vscode.commands.registerCommand('extension.linkPackageToTarget', linkPackage);
    vscode.commands.registerCommand('extension.installTargetPackage', installTarget, { fromMenu: true });
    vscode.commands.registerCommand('extension.deleteTargetNodeModules', deleteTargetNodeModules);
    vscode.commands.registerCommand('extension.scopedBuildCommand', scopedBuildCommand);
}

export function deactivate() {

}