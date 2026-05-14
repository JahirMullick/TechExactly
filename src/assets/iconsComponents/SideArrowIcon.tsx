import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const SideArrowIcon: React.FC<IconProps> = ({
  width = 11,
  height = 19,
  strokeColor = "white",
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 11 19"
    fill="none"
    {...props}
  >
    <Path
      d="M1.0625 0.838379L9.0625 9.40981L1.0625 17.9812"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SideArrowIcon;
