'use strict';
import * as vscode from 'vscode';
import { Task } from 'vscode';

export class ObgTaskProvider implements vscode.TaskProvider {
    private tasks: Task[] = [];

    constructor(tasks: Task[]) {
        this.tasks = tasks;
    }

    provideTasks(token?: vscode.CancellationToken | undefined): vscode.ProviderResult<vscode.Task[]> {
        return this.tasks;
    }

    resolveTask(task: vscode.Task, token?: vscode.CancellationToken | undefined): vscode.ProviderResult<vscode.Task> {
        return undefined;
    }
}