import Parse from 'parse/node'
import { IProject } from "./types"
import { ParseBaseClass } from "../baseClasses";
import { Cart } from "..";
import { ICoordinates } from "../address/types";

export const PROJECT_CLASSNAME = "Project";
export interface Project extends IProject {}
export class Project extends ParseBaseClass {
  project;
  constructor(project: IProject) {
    super(PROJECT_CLASSNAME);
    this.fromObject(project);
  }

  get projectNumber() {
    return this.id;
  }
}
