import * as React from "react";

type ProgressBarComponent = React.FC<{
  progress?: number;
}>;

const ProgressBar: ProgressBarComponent = ({ progress = 0 }) => {
  return (
    <div className="w-full h-1 overflow-hidden bg-gray-200 rounded-full">
      <div
        className="w-full h-full transition-transform duration-150 ease-out origin-left bg-teal-400"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ProgressBar;
