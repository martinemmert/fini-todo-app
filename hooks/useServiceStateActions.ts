import * as React from "react";
import { Interpreter, State, MachineOptions } from "xstate";

const useExecuteStateActions = (
  service: Interpreter<any>,
  state: State<any>,
  actionsConfig?: MachineOptions<any, any>["actions"]
) => {
  React.useEffect(() => {
    service.execute(state, actionsConfig);
  }, [state]);
};

export default useExecuteStateActions;
