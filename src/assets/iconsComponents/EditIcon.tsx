import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  width?: number;
  height?: number;
  fillColor?: string;
}

const EditIcon: React.FC<IconProps> = ({
  width = 26,
  height = 26,
  fillColor = "white",
  ...props
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 26 26"
    fill="none"
    {...props}
  >
    <Path
      d="M6.02279 20.7209H7.50716L17.6895 10.5386L16.2051 9.0542L6.02279 19.2365V20.7209ZM3.93945 22.8042V18.3771L17.6895 4.65316C17.8978 4.46219 18.128 4.31462 18.3801 4.21045C18.6322 4.10628 18.8967 4.0542 19.1738 4.0542C19.4509 4.0542 19.72 4.10628 19.9811 4.21045C20.2422 4.31462 20.4679 4.47087 20.6582 4.6792L22.0905 6.13753C22.2988 6.32851 22.4509 6.5542 22.5467 6.81462C22.6426 7.07503 22.6901 7.33545 22.6895 7.59587C22.6895 7.87364 22.6419 8.13857 22.5467 8.39066C22.4516 8.64274 22.2995 8.8726 22.0905 9.08024L8.36654 22.8042H3.93945ZM16.9342 9.80941L16.2051 9.0542L17.6895 10.5386L16.9342 9.80941Z"
      fill={fillColor}
    />
  </Svg>
);

export default EditIcon;
