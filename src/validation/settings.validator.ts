'use strict';
import * as vscode from 'vscode';
import { OBG, TARGET_NODE_MODULES_FOLDER } from '../constants';

export class SettingsValidator {
    static async validateSettings() {
        const configuration = vscode.workspace.getConfiguration();

        if (!configuration.has(`${OBG}`)) {
            await vscode.window.showErrorMessage(`${OBG} is not defined in configuration.`);
            return false;
        }

        const targetNodeModulesFolder: object | undefined = configuration.get(`${OBG}.${TARGET_NODE_MODULES_FOLDER}`);

        if (!targetNodeModulesFolder) {
            await vscode.window.showErrorMessage(`${OBG}.${TARGET_NODE_MODULES_FOLDER} is not defined in configuration.`);
            return false;
        }

        if (Object.keys(configuration.get(`${OBG}.${TARGET_NODE_MODULES_FOLDER}`)!).length === 0) {
            await vscode.window.showErrorMessage(`${OBG}.${TARGET_NODE_MODULES_FOLDER} has no target properties. You need to define at least one.`);
            return false;
        }

        return true;
    }
}