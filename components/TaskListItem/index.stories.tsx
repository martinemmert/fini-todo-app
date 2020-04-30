import * as React from "react";
import TaskListItem from "./TaskListItem";
import { interpret, Machine, assign, spawn } from "xstate";
import TaskMachine from "../../state/TaskMachine";
import { ITaskListItem } from "../../@types";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components / TaskListItem",
  component: TaskListItem,
  parameters: {
    info: { inline: true },
  },
};

const onEvent = action("onEvent");

const pendingTask = {
  id: "pending-task",
  title: "Some pending Task",
  completed: false,
};

const completedTask = {
  id: "pending-task",
  title: "Some completed Task",
  completed: true,
};

const parentMachine = Machine<{
  pendingTask?: ITaskListItem;
  completedTask?: ITaskListItem;
}>({
  initial: "idle",
  context: {},
  states: {
    idle: {
      entry: assign({
        pendingTask: () => ({
          ...pendingTask,
          taskServiceRef: spawn(TaskMachine.withContext(pendingTask)),
        }),
        completedTask: () => ({
          ...pendingTask,
          taskServiceRef: spawn(TaskMachine.withContext(completedTask)),
        }),
      }),
    },
  },
});

export const Pending = () => {
  const service = interpret(parentMachine, { execute: false }).start();
  const taskService = service.state.context.pendingTask.taskServiceRef;
  taskService.onEvent((event) => onEvent(event.type));
  return <TaskListItem service={taskService} />;
};

export const Completed = () => {
  const service = interpret(parentMachine, { execute: false }).start();
  const taskService = service.state.context.completedTask.taskServiceRef;
  taskService.onEvent((event) => onEvent(event.type));
  return <TaskListItem service={taskService} />;
};

export const Editing = () => {
  const service = interpret(parentMachine, { execute: false }).start();
  const taskService = service.state.context.pendingTask.taskServiceRef;
  taskService.send("edit");
  taskService.onEvent((event) => onEvent(event.type));
  return <TaskListItem service={taskService} />;
};
