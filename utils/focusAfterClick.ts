const withAutoFocusEnabledAfterClick = (
  eventHandler: (event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>) => void
) => (event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>) => {
  const dummyInput = document.createElement("input");
  dummyInput.style.position = "absolute";
  dummyInput.style.fontSize = "16px";
  dummyInput.style.opacity = "0";
  dummyInput.style.height = "0px";
  dummyInput.onblur = () => document.body.removeChild(dummyInput);
  document.body.appendChild(dummyInput);
  dummyInput.focus();
  eventHandler(event);
};

export default withAutoFocusEnabledAfterClick;
