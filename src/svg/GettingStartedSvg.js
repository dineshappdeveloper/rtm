import * as React from "react";
import Svg, { Path } from "react-native-svg";

const GettingStartedSvg = (props) => (
    <Svg
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M.822 8.969c.551-4.315 3.904-7.272 8.214-7.864A118.651 118.651 0 0 1 25 0c6.32 0 11.91.547 15.964 1.105 4.31.592 7.663 3.549 8.214 7.864C49.624 12.464 50 17.603 50 25c0 7.397-.376 12.536-.822 16.032-.551 4.314-3.904 7.27-8.214 7.863A118.638 118.638 0 0 1 25 50c-6.32 0-11.91-.547-15.964-1.105-4.31-.592-7.663-3.549-8.214-7.864C.376 37.537 0 32.398 0 25c0-7.397.376-12.536.822-16.031Z"
            fill="#111"
        />
        <Path
            d="M25 32V18M18 25l7-7 7 7"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default GettingStartedSvg;
