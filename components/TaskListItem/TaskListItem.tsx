import { useService } from "@xstate/react";
import * as React from "react";
import { Interpreter } from "xstate";
import { TaskMachineContext } from "../../state/TaskMachine";
import Checkbox from "./Checkbox";
import OptionsList from "./OptionsList";
import OptionsListButton from "./OptionsListButton";
import TextInput from "./TextInput";
import useExecuteStateActions from "../../hooks/useServiceStateActions";
import withAutoFocusEnabledAfterClick from "../../utils/focusAfterClick";

type TaskListItemComponent = React.FC<
  React.HTMLAttributes<HTMLLIElement> & {
    service: Interpreter<TaskMachineContext>;
  }
>;

const useCallbackRef = function <T>(
  ...deps
): [React.MutableRefObject<T>, T, (node: T) => void] {
  const [node, setNode] = React.useState<T>(null);
  const ref = React.useRef<T>(node);
  const callback = React.useCallback((node) => {
    setNode(node);
    ref.current = node;
  }, deps);
  return [ref, node, callback];
};

const TaskListItem: TaskListItemComponent = ({ service, ...props }) => {
  const [state, send] = useService(service);
  const [inputRef, inputNode, inputRefCallback] = useCallbackRef<
    HTMLInputElement
  >(state);

  useExecuteStateActions(service, state, {
    focusInput: () => {
      inputRef.current?.focus();
    },
  });

  const sendEdit = withAutoFocusEnabledAfterClick(() => send("edit"));

  React.useEffect(() => {
    const mouseDownHandler = () => {
      inputRef.current?.removeEventListener("focusout", handleFocusOut);
    };

    const handleFocusOut = () => {
      send("cancel")
    };
    
    inputRef.current?.addEventListener("focusout", handleFocusOut);
    document.addEventListener("mousedown", mouseDownHandler);

    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
      inputRef.current?.removeEventListener("focusout", handleFocusOut);
    };
  }, [inputNode]);

  return (
    <li
      className="flex flex-row items-start mt-4 md:mt-2 first:mt-0"
      {...props}
    >
      <Checkbox
        checked={state.matches("reading.completed")}
        onClick={() => send("toggle")}
      />
      {state.matches("reading.pending") && (
        <p
          className="block w-full px-4 py-2 font-serif text-base leading-normal border border-transparent rounded font-book"
          onClick={sendEdit}
        >
          {state.context.title}
        </p>
      )}
      {state.matches("reading.completed") && (
        <p className="block w-full px-4 py-2 font-serif text-base leading-normal text-gray-500 line-through border border-transparent rounded cursor-default font-book">
          {state.context.title}
        </p>
      )}
      {state.matches("editing") && (
        <TextInput
          innerRef={inputRefCallback}
          value={state.context.title}
          onCommit={(_, value) => send("commit", { title: value })}
          onCancel={() => send("cancel")}
        />
      )}
      {state.matches("reading") && (
        <OptionsList className="mt-2">
          <OptionsListButton
            iconName="trash"
            className="text-gray-400"
            onClick={() => send("delete")}
          />
        </OptionsList>
      )}
    </li>
  );
};

export default TaskListItem;
