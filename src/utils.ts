import { deleteNodeModulesTask } from "./tasks/deleteNodeModules.task";

import { deleteLinkTask } from "./tasks/deleteLink.task";

import { createLinkTask } from "./tasks/createLink.task";

import { linkPackageTask } from "./tasks/linkPackage.task";

export function createTasks(packageName: string, targetProperty: string) {
    const deleteNodeModules = deleteNodeModulesTask(packageName);
    const deleteLink = deleteLinkTask(packageName);
    const createLink = createLinkTask(packageName);
    const link = linkPackageTask(packageName, targetProperty);

    return [deleteNodeModules, deleteLink, createLink, link];
}

export function getPackageName(path: string) {
    const startIndex = path.indexOf("\\packages\\");
    const packageName = path.substring(startIndex + "\\packages\\".length);
    return packageName;
}