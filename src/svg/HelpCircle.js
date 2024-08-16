import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HelpCircle = (props) => (
    <Svg
        width={20}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
            stroke="#111"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M7.575 7.5a2.5 2.5 0 0 1 4.858.833c0 1.667-2.5 2.5-2.5 2.5M10 14.167h.008"
            stroke="#111"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default HelpCircle;
