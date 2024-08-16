import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const Point = (props) => (
    <Svg
        width={2}
        height={3}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={1} cy={1.5} r={1} fill="#666" />
    </Svg>
);

export default Point;
