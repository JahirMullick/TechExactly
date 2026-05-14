// icon component for notification with indecator
import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

interface NotificationIconProps extends SvgProps {
  isIndicator?: boolean;
  stroke?: string
}

const NotificationIcon = ({ isIndicator = false, stroke = "#555555", ...props }: NotificationIconProps) => (
  <Svg
    width={19}
    height={21}
    viewBox="0 0 19 21"
    fill="none"
    {...props}
  >
    <Path
      d="M12.4983 16.1952V16.9234C12.4983 17.696 12.1963 18.4369 11.6587 18.9832C11.1212 19.5295 10.3921 19.8364 9.6319 19.8364C8.87169 19.8364 8.14262 19.5295 7.60508 18.9832C7.06753 18.4369 6.76554 17.696 6.76554 16.9234V16.1952M17.3209 14.7128C16.1708 13.2823 15.3588 12.5541 15.3588 8.61022C15.3588 4.99865 13.544 3.71195 12.0504 3.08704C11.852 3.0042 11.6652 2.81395 11.6048 2.60686C11.3428 1.70067 10.6083 0.902344 9.6319 0.902344C8.65555 0.902344 7.92059 1.70112 7.66128 2.60777C7.60081 2.81714 7.41405 3.0042 7.21565 3.08704C5.72021 3.71286 3.90724 4.99501 3.90724 8.61022C3.905 12.5541 3.09301 13.2823 1.94289 14.7128C1.46635 15.3054 1.88377 16.1952 2.71725 16.1952H16.551C17.38 16.1952 17.7948 15.3027 17.3209 14.7128Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {isIndicator && (
      <Circle
        cx={14.6802}
        cy={6.26811}
        r={2.97124}
        fill="#FD3454"
        stroke="white"
      />
    )}
  </Svg>
);

export default NotificationIcon;
