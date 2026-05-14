import Svg, { Rect, G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";
const DeleteIcon = (props:SvgProps) => (
  <Svg
    width={37}
    height={37}
    viewBox="0 0 37 37"
    fill="none"
    {...props}
  >
    <Rect width={37} height={37} rx={10} fill="#F18F84" fillOpacity={0.2} />
    <G clipPath="url(#clip0_1666_738)">
      <Path
        d="M10.7916 13.1042H26.2083"
        stroke="#EF5446"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.6667 13.1042V25.2449C24.6667 26.1121 23.7858 26.9792 22.9048 26.9792H14.0953C13.2143 26.9792 12.3334 26.1121 12.3334 25.2449V13.1042"
        stroke="#EF5446"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.4166 13.1041V11.5624C15.4166 10.7916 16.1875 10.0208 16.9583 10.0208H20.0416C20.8125 10.0208 21.5833 10.7916 21.5833 11.5624V13.1041"
        stroke="#EF5446"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.9584 16.9583V23.1249"
        stroke="#EF5446"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.0416 16.9583V23.1249"
        stroke="#EF5446"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1666_738">
        <Rect
          width={18.5}
          height={18.5}
          fill="white"
          transform="translate(9.25 9.25)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default DeleteIcon;
