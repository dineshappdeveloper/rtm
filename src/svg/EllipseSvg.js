import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const EllipseSvg = () => (
    <Svg width={80} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx={50} cy={50} r={50} fill="#FED7C7" />
    </Svg>
);

export default EllipseSvg;
