import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Play = (props) => (
    <Svg
        width={30}
        height={30}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={15} cy={15} r={14.5} stroke="#666" />
        <Path
            d="M19.5 14.134a1 1 0 0 1 0 1.732l-6 3.464a1 1 0 0 1-1.5-.866v-6.928a1 1 0 0 1 1.5-.866l6 3.464Z"
            fill="#000"
        />
    </Svg>
);

export default Play;
