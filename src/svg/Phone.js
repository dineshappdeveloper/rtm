// Phone.js
import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Phone = (props) => (
  <Svg
    width={50}
    height={50}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23 3v18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2zm-6 0v18"
    />
  </Svg>
);

export default Phone;
