import * as React from "react";
import classnames from "classnames";

type OptionsListComponent = React.FC<
  React.HTMLAttributes<HTMLUListElement> & { ref?: React.Ref<HTMLUListElement> }
>;

const OptionsList: OptionsListComponent = ({ children, className, ...props }) => {
  const cn = classnames("flex flex-row items-center", className);
  return (
    <ul className={cn} {...props}>
      {children}
    </ul>
  );
};

export default OptionsList;
