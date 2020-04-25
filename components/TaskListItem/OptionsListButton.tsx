import * as React from "react";
import TablerIcon from "../TablerIcon";
import classnames from "classnames";

type OptionsListButtonComponent = React.FC<
  React.HTMLAttributes<HTMLLIElement> & { iconName: string }
>;

const OptionsListButton: OptionsListButtonComponent = ({
  iconName,
  className,
  ...props
}) => {
  const cn = classnames("block ml-2", className);
  return (
    <li className={cn} {...props}>
      <TablerIcon iconName={iconName} className="w-8 h-8" />
    </li>
  );
};

export default OptionsListButton;
