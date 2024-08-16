import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const CategoriesTab = ({ strokeColor }) => (
    <Svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect x={4} y={4} width={8} height={8} fill={strokeColor} />
        <Rect x={16} y={4} width={8} height={8} fill={strokeColor} />
        <Rect x={4} y={16} width={8} height={8} fill={strokeColor} />
        <Rect x={16} y={16} width={8} height={8} fill={strokeColor} />
    </Svg>
);

export default CategoriesTab;
