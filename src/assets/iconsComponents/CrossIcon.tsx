// icon component for back
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CrossIconProps extends SvgProps {
    stroke?: string;
}
const CrossIcon = ({ stroke = "#867D7D", ...props }: CrossIconProps) => (
    <Svg
        width={13}
        height={13}
        viewBox="0 0 13 13"
        fill="none"
        {...props}
    >
        <Path d="M1 12L12 1M1 1L12 12" stroke={stroke} strokeLinecap="round" />
    </Svg>
);
export default CrossIcon;