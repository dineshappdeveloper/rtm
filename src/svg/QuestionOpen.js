import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const QuestionOpen = (props) => (
    <Svg
        width={11}
        height={6}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M.857 5.143 5.143.857l4.286 4.286"
                stroke="#111"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    transform="rotate(90 5 5.143)"
                    d="M0 0h5.714v10H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default QuestionOpen;
