import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";

interface LocationIconProps extends SvgProps {
  size?: number;        // Optional: use if you want same width/height
  color?: string;
  width?: number;       // Individual width control
  height?: number;      // Individual height control
}

const LocationIcon: React.FC<LocationIconProps> = ({
  size,
  color = "#fff",
  width,
  height,
  ...props
}) => {
  // Priority: specific width/height > size prop > default 16
  const finalWidth = width ?? size ?? 16;
  const finalHeight = height ?? size ?? 16;

  return (
    <Svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_164_3741)">
        <Path
          d="M11.9443 2.43123C11.3909 1.92692 10.7423 1.53817 10.0367 1.28777C9.33112 1.03737 8.58262 0.930352 7.83511 0.973C7.0876 1.01565 6.35613 1.2071 5.68358 1.53613C5.01103 1.86516 4.41093 2.32515 3.91847 2.88913C3.42601 3.45311 3.0511 4.10973 2.81572 4.82049C2.58034 5.53125 2.48922 6.28185 2.54771 7.02829C2.6062 7.77472 2.81312 8.50197 3.15634 9.16739C3.49955 9.83282 3.97216 10.423 4.54646 10.9034C5.85941 11.995 6.95643 13.3227 7.78083 14.8179C7.82114 14.8924 7.88086 14.9546 7.95365 14.9978C8.02645 15.0411 8.1096 15.0638 8.19427 15.0636C8.27888 15.0635 8.3619 15.0406 8.43452 14.9972C8.50715 14.9538 8.56667 14.8915 8.60677 14.817L8.64521 14.7448C9.47553 13.2677 10.5703 11.9557 11.8749 10.8744C12.4795 10.3519 12.9657 9.70648 13.3011 8.98122C13.6365 8.25596 13.8134 7.46752 13.8199 6.66849C13.8265 5.86945 13.6626 5.07821 13.3392 4.34754C13.0157 3.61686 12.5402 2.96357 11.9443 2.43123ZM8.19427 8.96982C7.73072 8.96982 7.27758 8.83236 6.89215 8.57483C6.50673 8.31729 6.20632 7.95125 6.02893 7.52298C5.85154 7.09472 5.80512 6.62347 5.89556 6.16883C5.98599 5.71418 6.20921 5.29657 6.53699 4.96879C6.86477 4.64101 7.28239 4.41779 7.73703 4.32735C8.19167 4.23692 8.66292 4.28333 9.09119 4.46073C9.51945 4.63812 9.88549 4.93852 10.143 5.32395C10.4006 5.70938 10.538 6.16252 10.538 6.62607C10.5373 7.24744 10.2901 7.84315 9.85073 8.28253C9.41135 8.72191 8.81564 8.96908 8.19427 8.96982Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_164_3741">
          <Rect
            width={15}
            height={15}
            fill={color}
            transform="translate(0.694336 0.532227)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LocationIcon;
