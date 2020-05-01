import * as React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import ProgressBar from "./ProgressBar";

export default {
  title: "Components",
  decorators: [withKnobs],
};

const ProgressBarStory = () => {
  const progress = number("Progress", 0.35, {
    min: 0,
    max: 1,
    step: 0.01,
    range: true,
  });
  return <ProgressBar progress={progress} />;
};

ProgressBarStory.story = {
  name: "ProgressBar"
}

export { ProgressBarStory };
