import { Machine, assign, EventObject, sendParent } from "xstate";
import { ITask } from "../@types";

export type TaskMachineContext = ITask & { prevTitle?: string };
export interface TaskMachineCommitEvent extends EventObject {
  title: string;
}

const TaskMachine = Machine<TaskMachineContext>(
  {
    id: "task-list-item",
    initial: "reading",
    states: {
      reading: {
        id: "reading",
        initial: "init",
        states: {
          init: {
            on: {
              "": [
                { target: "completed", cond: ({ completed }) => completed },
                { target: "pending" },
              ],
            },
          },
          pending: {
            on: {
              edit: "#editing",
              toggle: {
                target: "completed",
                actions: [
                  assign((context) => ({
                    ...context,
                    completed: false,
                    completedOn: new Date().toISOString(),
                  })),
                  sendParent((context) => ({ type: "commitTask", task: context })),
                ],
              },
            },
          },
          completed: {
            on: {
              toggle: {
                target: "pending",
                actions: [
                  assign((context) => ({
                    ...context,
                    completed: false,
                    completedOn: undefined,
                  })),
                  sendParent((context) => ({ type: "commitTask", task: context })),
                ],
              },
            },
          },
        },
      },
      editing: {
        id: "editing",
        entry: "focusInput",
        on: {
          commit: {
            target: "reading",
            actions: [
              assign<TaskMachineContext, TaskMachineCommitEvent>({
                title: (_, event) => event.title,
              }),
              sendParent((context) => ({ type: "commitTask", task: context })),
            ],
          },
          cancel: {
            target: "reading",
            actions: sendParent((context) => ({
              type: "commitTask",
              task: context,
            })),
          },
        },
      },
    },
    on: {
      delete: {
        actions: sendParent((context) => ({ type: "deleteTask", task: context }))
      },
    },
  },
  { actions: { focusInput: () => null } }
);

export default TaskMachine;
