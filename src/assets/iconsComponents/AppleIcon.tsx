import React from "react";
import Svg, { Path } from "react-native-svg";

interface AppleIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const AppleIcon: React.FC<AppleIconProps> = ({
  width = 16,
  height = 19,
  color = "black",
}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 19"
    fill="none"
  >
    <Path
      d="M12.8168 17.7444C11.8368 18.6944 10.7668 18.5444 9.73683 18.0944C8.64683 17.6344 7.64683 17.6144 6.49683 18.0944C5.05683 18.7144 4.29683 18.5344 3.43683 17.7444C-1.44317 12.7144 -0.723173 5.05436 4.81683 4.77436C6.16683 4.84436 7.10683 5.51436 7.89683 5.57436C9.07683 5.33436 10.2068 4.64436 11.4668 4.73436C12.9768 4.85436 14.1168 5.45436 14.8668 6.53436C11.7468 8.40436 12.4868 12.5144 15.3468 13.6644C14.7768 15.1644 14.0368 16.6544 12.8068 17.7544L12.8168 17.7444ZM7.79683 4.71436C7.64683 2.48436 9.45683 0.644355 11.5368 0.464355C11.8268 3.04436 9.19683 4.96436 7.79683 4.71436Z"
      fill={color}
    />
  </Svg>
);

export default AppleIcon
