import * as React from "react";

type OptionsListComponent = React.FC<
  React.HTMLAttributes<HTMLUListElement> & { ref?: React.Ref<HTMLUListElement> }
>;

const OptionsList: OptionsListComponent = ({ children, ...props }) => {
  return (
    <ul className="flex flex-row items-center" {...props}>
      {children}
    </ul>
  );
};

export default OptionsList;
