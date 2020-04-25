import { useMachine } from "@xstate/react";
import * as React from "react";
import TablerIcon from "../components/TablerIcon";
import TaskList from "../components/TaskList";
import TasksMachine from "../state/TasksMachine";
import Navbar from "../components/Navbar";

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

  React.useEffect(() => {
    service.execute(state);
  }, [state]);

  const { tasks } = state.context;

  return (
    <main>
      <Navbar />
      <div className="max-w-3xl px-8 mx-auto mt-6 md:my-12">
        <h1 className="mb-6 font-serif text-lg font-semibold leading-none text-gray-800 ml-14 md:text-2xl md:mb-14">
          Inbox
        </h1>
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
        <button className="flex items-center mt-6 text-gray-600 ml-14">
          <TablerIcon iconName="circle-plus" className="w-6 h-6" />
          <span
            className="relative ml-2 font-sans leading-none uppercase text-small"
            onClick={() => send("addNewTask")}
          >
            Add new task
          </span>
        </button>
      </div>
    </main>
  );
};
