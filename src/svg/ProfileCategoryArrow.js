import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const ProfileCategoryArrow = (props) => (
    <Svg
        width={6}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M1 9.286 5.286 5 1 .714"
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
                    transform="matrix(-1 0 0 1 6 0)"
                    d="M0 0h5.714v10H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default ProfileCategoryArrow;
