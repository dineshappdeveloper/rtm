import * as React from "react";
import Svg, { Path } from "react-native-svg";

const TopRatedCheck = (props) => (
    <Svg
        width={17}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M15.167 1.846 6 11.154l-4.167-4.23"
            stroke="#111"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default TopRatedCheck;
