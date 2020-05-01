import * as React from "react";
import ProgressBar from "../ProgressBar";

type TaskListProgressComponent = React.FC<{
  completedTasks: number;
  totalTasks: number;
} & React.HTMLAttributes<HTMLDivElement>>;

const TaskListProgress: TaskListProgressComponent = ({
  completedTasks,
  totalTasks,
  ...props
}) => {
  const pendingTasks = totalTasks - completedTasks;
  const progress = completedTasks / totalTasks;
  
  const pendingLabel =
    pendingTasks == 1 ? `, 1 remaining task.` : `, ${pendingTasks} remaining tasks.`;
  const progressLabel = `${completedTasks} of ${totalTasks} completed${pendingTasks > 0 ? pendingLabel : ''}`;
  const progressPercentageLabel = `${Math.round(progress * 100)}% completed`;
  return (
    <div {...props}>
      <ProgressBar progress={progress} />
      <p className="mt-2 font-sans leading-none text-gray-600 uppercase text-small">
        <span className="inline-block w-1/2">{progressLabel}</span>
        <span className="inline-block w-1/2 text-right">
          {progressPercentageLabel}
        </span>
      </p>
    </div>
  );
};

export default TaskListProgress;
