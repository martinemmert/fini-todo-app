import { assign, Machine, spawn, send, Interpreter, EventObject } from "xstate";
import { ITaskListItem, ITask } from "../@types";
import TaskMachine from "./TaskMachine";
import { v4 as uuid } from "uuid";
import { raise } from "xstate/lib/actions";

export type TasksMachineContext = {
  tasks: ITaskListItem[];
  newTaskRef?: Interpreter<ITask>;
};

export interface TasksMachineCommitEvent extends EventObject {
  task: ITask;
}

const TasksMachine = Machine<TasksMachineContext>({
  id: "task-list",
  initial: "idle",
  context: { tasks: [], newTaskRef: null },
  states: {
    init: {
      on: {
        "": {
          target: "idle",
          actions: assign({
            tasks: (context) =>
              context.tasks.map((task) => ({
                ...task,
                taskServiceRef: spawn(
                  TaskMachine.withContext(task),
                  `task-${task.id}`
                ),
              })),
          }),
        },
      },
    },
    idle: {},
    addingNewTask: {
      on: {
        newTaskCommitted: {
          target: "idle",
          actions: assign(() => ({ newTaskRef: undefined })),
        },
      },
    },
  },
  on: {
    resetTasks: {
      target: "init",
      actions: assign((_, event) => ({ tasks: event.tasks })),
    },
    addNewTask: {
      target: "addingNewTask",
      actions: [
        assign((context) => {
          const newTask = { id: uuid(), title: "", completed: false };
          const machine = TaskMachine.withContext(newTask);
          const taskServiceRef = spawn(machine, `task-${newTask.id}`);
          return {
            newTaskRef: taskServiceRef,
            tasks: [...context.tasks, { ...newTask, taskServiceRef }],
          };
        }),
        send("edit", { to: (context) => context.newTaskRef }),
      ],
    },
    commitTask: {
      actions: [
        assign<TasksMachineContext, TasksMachineCommitEvent>({
          tasks: (context, event) => {
            if (event.task.title.trim() === "") {
              return context.tasks.filter((task) => task.id !== event.task.id);
            } else {
              return context.tasks.map((task) => {
                return task.id === event.task.id
                  ? { ...event.task, taskServiceRef: task.taskServiceRef }
                  : task;
              });
            }
          },
        }),
        raise("newTaskCommitted"),
        "persist",
      ],
    },
    deleteTask: {
      actions: [
        assign<TasksMachineContext, TasksMachineCommitEvent>({
          tasks: (context, event) => {
            return context.tasks.filter((task) => task.id !== event.task.id);
          },
        }),
        "persist",
      ],
    },
  },
});

export default TasksMachine;
