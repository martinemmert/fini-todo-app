import * as React from "react";
import { ITaskList } from "../../@types";
import TaskListItem from "../TaskListItem";

type TaskListComponent = React.FC<
  React.HTMLAttributes<HTMLUListElement> & ITaskList
>;

const TaskList: TaskListComponent = ({ tasks, ...props }) => {
  return (
    <ul {...props}>
      {tasks.map((task) => <TaskListItem key={task.id} service={task.taskServiceRef} />)}
    </ul>
  );
};

export default TaskList;
