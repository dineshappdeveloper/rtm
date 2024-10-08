import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Google = (props) => (
    <Svg
        width={80}
        height={80}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G opacity={0.3} filter="url(#a)">
            <Path
                d="M10.846 17.928C11.521 12 16.093 7.933 22.01 7.17A142.2 142.2 0 0 1 40 6a142.2 142.2 0 0 1 17.99 1.17c5.917.763 10.49 4.83 11.164 10.758C69.625 22.074 70 27.913 70 36s-.375 13.926-.846 18.072C68.48 60 63.907 64.067 57.99 64.83A142.204 142.204 0 0 1 40 66c-6.995 0-13.244-.559-17.99-1.17-5.917-.763-10.49-4.83-11.164-10.758C10.375 49.926 10 44.087 10 36s.375-13.926.846-18.072Z"
                fill="#fff"
            />
        </G>
        <Path
            d="M36.786 34.345h7.267a8.757 8.757 0 0 1-.17 4.088c-.379 1.287-1.041 2.366-1.987 3.237-.87.795-1.93 1.343-3.18 1.646-1.363.303-2.687.284-3.974-.056a7.203 7.203 0 0 1-2.782-1.42 7.534 7.534 0 0 1-2.101-2.555c-.833-1.59-1.06-3.274-.682-5.053.114-.681.341-1.325.682-1.93.908-1.893 2.365-3.18 4.372-3.861 1.74-.606 3.482-.587 5.223.056.909.34 1.741.852 2.498 1.533a3.321 3.321 0 0 1-.397.454c-.19.152-.303.265-.34.341-.152.114-.398.34-.739.681-.303.303-.53.55-.681.739a3.959 3.959 0 0 0-1.703-1.022 4.21 4.21 0 0 0-2.272-.057 4.526 4.526 0 0 0-2.328 1.249 5.529 5.529 0 0 0-1.135 1.874c-.34.984-.34 1.987 0 3.009.34.984.946 1.779 1.817 2.384.53.379 1.098.625 1.703.739.568.113 1.192.113 1.874 0a4.248 4.248 0 0 0 1.703-.682c.87-.567 1.382-1.362 1.533-2.384h-4.201v-3.01Zm16.465.17v1.931h-2.668v2.612h-1.93v-2.612h-2.67v-1.93h2.67v-2.669h1.93v2.669h2.668Z"
            fill="#DD4B39"
        />
        <Defs></Defs>
    </Svg>
);

export default Google;
