import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowWhite = (props) => (
    <Svg
        width={8}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M7 13 1 7l6-6"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default ArrowWhite;
