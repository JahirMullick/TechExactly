import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const DownArrowIcon: React.FC<IconProps> = ({
  width = 15,
  height = 9,
  strokeColor = "#7F7F7F",
  strokeWidth = 2,
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 15 9"
    fill="none"
    {...props}
  >
    <Path
      d="M13.5483 1.10547L7.11977 7.10547L0.691198 1.10547"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    />
  </Svg>
);

export default DownArrowIcon;
