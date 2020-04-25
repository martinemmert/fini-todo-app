import * as React from "react";

const src = "/assets/tabler-sprite.svg"

type TablerIconProps = React.FC<React.SVGAttributes<SVGElement> & { iconName: string }>;


const TablerIcon: TablerIconProps = ({iconName, ...props}) => {
  return <svg {...props}>
    <use xlinkHref={`${src}#tabler-${iconName}`} />
  </svg>
}

export default TablerIcon;