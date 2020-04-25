import * as React from "react";
import classnames from "classnames";
import OptionsListButton from "./OptionsListButton";
import OptionsList from "./OptionsList";

type TextInputComponent = React.FC<
  React.InputHTMLAttributes<HTMLDivElement> & {
    innerRef?: React.Ref<HTMLInputElement>;
    value?: string;
    onCommit?: (
      event:
        | Event
        | React.MouseEvent<HTMLLIElement, MouseEvent>
        | React.KeyboardEvent<HTMLInputElement>,
      value?: string
    ) => void;
    onCancel?: (
      event:
        | Event
        | React.MouseEvent<HTMLLIElement, MouseEvent>
        | React.KeyboardEvent<HTMLInputElement>
    ) => void;
  }
>;

const TextInput: TextInputComponent = ({
  innerRef,
  value = "",
  onCommit,
  onCancel,
  className,
  ...props
}) => {
  const outerRef = React.useRef<HTMLDivElement>();
  const [currentValue, setCurrentValue] = React.useState(value);

  function onDocumentClick(event: MouseEvent) {
    // abort if target is within this the components most outer node
    if (outerRef?.current.contains(event.target as Node)) return;
    // cancel if clicked outside
    if (onCancel) onCancel(event);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // commit if enter is pressed
    if (event.key === "Enter" && onCommit)
      onCommit(event, currentValue);
    // cancel if escape is pressed
    if (event.key === "Escape" && onCancel) onCancel(event);
  }

  React.useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [outerRef]);

  const cn = classnames("flex w-full", className);

  return (
    <div ref={outerRef} className={cn} {...props} >
      <input
        ref={innerRef}
        type="text"
        className="block px-4 py-2 w-full font-serif font-book text-base leading-normal border rounded focus:outline-none appearance-none text-gray-800 cursor-text bg-gray-100 border-gray-400"
        defaultValue={currentValue}
        onKeyDown={onKeyDown}
        onInput={(event) => setCurrentValue(event.currentTarget.value)}
      />
      <OptionsList>
        <OptionsListButton
          iconName="circle-check"
          className="text-teal-500"
          onClick={(event) => onCommit(event, currentValue)}
        />
        <OptionsListButton
          iconName="circle-x"
          className="text-gray-500"
          onClick={(event) => onCancel(event)}
        />
      </OptionsList>
    </div>
  );
};

export default TextInput;
