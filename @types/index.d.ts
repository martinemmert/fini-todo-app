import { Interpreter } from "xstate";

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  createdOn?: string;
  updatedOn?: string;
  completedOn?: string;
}

export interface ITaskListItem extends ITask {
  taskServiceRef: Interpreter<ITask>;
}

export interface ITaskList {
  tasks: ITaskListItem[];
}