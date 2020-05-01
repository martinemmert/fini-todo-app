import * as React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import TaskListProgress from "./TaskListProgress";

export default {
  title: "Components / TaskListProgress",
  decorators: [withKnobs],
};

export const AllPending = () => {
  const totalTasks = 4;
  const completedTasks = number("completedTasks", 0, {
    min: 0,
    max: totalTasks,
    step: 1,
  });
  return <TaskListProgress completedTasks={completedTasks} totalTasks={totalTasks} />;
};

export const Itermediate = () => {
  const totalTasks = 4;
  const completedTasks = number("completedTasks", 2, {
    min: 0,
    max: totalTasks,
    step: 1,
    range: false,
  });
  return <TaskListProgress completedTasks={completedTasks} totalTasks={totalTasks} />;
};

export const OnePending = () => {
  const totalTasks = 4;
  const completedTasks = number("completedTasks", 3, {
    min: 0,
    max: totalTasks,
    step: 1,
  });
  return <TaskListProgress completedTasks={completedTasks} totalTasks={totalTasks} />;
};

export const Completed = () => {
  const totalTasks = 4;
  const completedTasks = number("completedTasks", 4, {
    min: 0,
    max: totalTasks,
    step: 1,
  });
  return <TaskListProgress completedTasks={completedTasks} totalTasks={totalTasks} />;
};
