// icon component for Open Eye
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const OpenEyeFill = (props: SvgProps) => (
    <Svg
        width={18}
        height={12}
        viewBox="0 0 18 12"
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.54 6C17.54 5.641 17.346 5.406 16.958 4.934C15.538 3.21 12.406 0 8.77 0C5.134 0 2.002 3.21 0.582 4.934C0.194 5.406 0 5.641 0 6C0 6.359 0.194 6.594 0.582 7.066C2.002 8.79 5.134 12 8.77 12C12.406 12 15.538 8.79 16.958 7.066C17.346 6.594 17.54 6.359 17.54 6ZM8.77 9C9.56565 9 10.3287 8.68393 10.8913 8.12132C11.4539 7.55871 11.77 6.79565 11.77 6C11.77 5.20435 11.4539 4.44129 10.8913 3.87868C10.3287 3.31607 9.56565 3 8.77 3C7.97435 3 7.21129 3.31607 6.64868 3.87868C6.08607 4.44129 5.77 5.20435 5.77 6C5.77 6.79565 6.08607 7.55871 6.64868 8.12132C7.21129 8.68393 7.97435 9 8.77 9Z"
            fill="black"
        />
    </Svg>
);
export default OpenEyeFill;