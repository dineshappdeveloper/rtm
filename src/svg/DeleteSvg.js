import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const DeleteSvg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <G>
      {" "}
      <Path fill="none" d="M0 0h24v24H0z" />{" "}
      <Path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />{" "}
    </G>{" "}
  </Svg>
);

export default DeleteSvg;