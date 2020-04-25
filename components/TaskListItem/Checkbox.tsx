import * as React from "react";

type CheckboxComponent = React.FC<React.SVGAttributes<SVGElement> & {
  checked?: boolean;
}>

const Box = ({ checked = false }) => {
  const props = { x: 4, y: 4, width: 16, height: 16, rx: 3 };
  if (checked) {
    return <rect {...props} className="text-gray-200 stroked filled" />;
  }
  return <rect {...props} className="text-gray-400 stroked" />;
}

const Checkbox: CheckboxComponent = ({ checked = false, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="flex-none w-8 h-8 mt-2 mr-2 cursor-pointer focus:outline-none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Box checked={checked} />
      {checked && <path className="text-gray-600 stroked" d="M9 12l2 2l4 -4"></path>}
    </svg>
  );
};

export default Checkbox;