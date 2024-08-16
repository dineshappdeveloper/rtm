import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const InstructorPlay = (props) => (
    <Svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={5} cy={5} r={5} fill="#111" />
        <Path d="M7.5 5 3.75 7.165v-4.33L7.5 5Z" fill="#fff" />
    </Svg>
);

export default InstructorPlay;
