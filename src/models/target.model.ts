import { Dependency } from "./dependency.model";

export interface Target {
    name: string;
    path: string;
    nodeModulesPath: string;
    npmDependencyPath: Dependency[];
}