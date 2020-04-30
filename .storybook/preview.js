import "../styles/index.css";

import { addParameters, addDecorator } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { withConsole, setConsoleOptions } from "@storybook/addon-console";
// import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  viewport: { viewports: INITIAL_VIEWPORTS },
  // disabled until the react props table is not a book anymore
  // docs: {
  //   container: DocsContainer,
  //   page: DocsPage,
  // },
});


setConsoleOptions({
  panelExclude: [/[HMR]/],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
