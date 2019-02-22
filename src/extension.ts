'use strict';
import * as vscode from 'vscode';
import { linkToTarget } from './linkProject';
import { npmInstall } from './npmInstall';
export function activate(context: vscode.ExtensionContext) {

    let obgLinkToTarget = vscode.commands.registerCommand('extension.obgLinkToTarget', linkToTarget);
    let obgInstallTarget = vscode.commands.registerCommand('extension.obgInstallTarget', npmInstall);

    context.subscriptions.push(obgLinkToTarget);
    context.subscriptions.push(obgInstallTarget);
}

export function deactivate() {

}