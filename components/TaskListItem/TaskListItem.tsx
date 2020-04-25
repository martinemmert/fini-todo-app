import { useService } from "@xstate/react";
import * as React from "react";
import { Interpreter } from "xstate";
import { TaskMachineContext } from "../../state/TaskMachine";
import Checkbox from "./Checkbox";
import OptionsList from "./OptionsList";
import OptionsListButton from "./OptionsListButton";
import TextInput from "./TextInput";

type TaskListItemComponent = React.FC<
  React.HTMLAttributes<HTMLLIElement> & {
    service?: Interpreter<TaskMachineContext>;
  }
>;

const TaskListItem: TaskListItemComponent = ({ service, ...props }) => {
  const [state, send] = useService(service);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    service.execute(state, {
      focusInput() {
        inputRef.current && inputRef.current.focus();
      },
    });
  }, [state, inputRef]);

  return (
    <li
      className="mt-4 md:mt-2 first:mt-0 flex flex-row items-start"
      {...props}
    >
      <Checkbox
        checked={state.matches("reading.completed")}
        onClick={() => send("toggle")}
      />
      {state.matches("reading.pending") && (
        <p
          className="block px-4 py-2 w-full font-serif font-book text-base leading-normal border rounded border-transparent"
          onClick={() => send("edit")}
        >
          {state.context.title}
        </p>
      )}
      {state.matches("reading.completed") && (
        <p className="block px-4 py-2 w-full font-serif font-book text-base leading-normal border rounded border-transparent text-gray-500 cursor-default line-through">
          {state.context.title}
        </p>
      )}
      {state.matches("editing") && (
        <TextInput
          innerRef={inputRef}
          value={state.context.title}
          onCommit={(_, value) => send("commit", { title: value })}
          onCancel={() => send("cancel")}
        />
      )}
      {state.matches("reading") && (
        <OptionsList className="mt-2">
          <OptionsListButton iconName="trash" className="text-gray-400" onClick={() => send("delete")} />
        </OptionsList>
      )}
    </li>
  );
};

export default TaskListItem;
