import { useMachine } from "@xstate/react";
import * as React from "react";
import TablerIcon from "../components/TablerIcon";
import TaskList from "../components/TaskList";
import TasksMachine from "../state/TasksMachine";
import Navbar from "../components/Navbar";
import withAutoFocusEnabledAfterClick from "../utils/focusAfterClick";
import useExecuteStateActions from "../hooks/useServiceStateActions";
import TaskListProgress from "../components/TaskListProgress";

export default () => {
  const [state, send, service] = useMachine(
    TasksMachine.withConfig(
      {
        actions: {
          persist: (context) => {
            if (window && window.localStorage) {
              localStorage.setItem("tasks", JSON.stringify(context.tasks));
            }
          },
        },
      },
      { tasks: [] }
    ),
    {
      devTools: true,
      execute: false,
    }
  );

  React.useEffect(() => {
    try {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      send("resetTasks", { tasks });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useExecuteStateActions(service, state);

  const { tasks } = state.context;

  // note:
  // the set timeout makes sure that if a task is
  // currently in edit mode, the commitTask event is handled
  // before the addNewTask event. It works but feels somewhat dirty.
  const handleOnClick = withAutoFocusEnabledAfterClick(() =>
    setTimeout(() => send("addNewTask"), 0)
  );

  return (
    <main>
      <Navbar />
      <div className="max-w-3xl px-8 mx-auto mt-6 md:my-12">
        <h1 className="font-serif text-lg font-semibold leading-none text-gray-800 md:text-2xl">
          Inbox
        </h1>
        <TaskListProgress
          completedTasks={tasks.filter((task) => task.completed).length}
          totalTasks={tasks.length}
          className="mt-4 mb-8"
        />
        {tasks.length > 0 && <TaskList tasks={tasks} />}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center">
            <img
              className="block"
              src="/assets/Illustrations/meditating.svg"
              alt="Illustration of a character during meditation."
            />
            <h2 className="text-2xl font-bold text-teal-400 float-text font-handwritten">
              fini ...
            </h2>
          </div>
        )}
        {state.matches("idle") && (
          <button className="flex items-center mt-6 text-gray-600 ml-14">
            <TablerIcon iconName="circle-plus" className="w-6 h-6" />
            <span
              className="relative ml-2 font-sans leading-none uppercase text-small"
              onClick={handleOnClick}
            >
              Add new task
            </span>
          </button>
        )}
      </div>
    </main>
  );
};
