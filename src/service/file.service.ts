'use strict';
import * as vscode from 'vscode';
import { existsSync } from 'fs';

export function checkPath(path: string) {
    if (existsSync(escape(path))) {
        vscode.window.showErrorMessage(`Path: ${path} does not exist!`);
        return false;
    }
    else {
        return true;
    }
}