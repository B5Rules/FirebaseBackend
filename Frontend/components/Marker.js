import * as React from "react"
import Svg, { Circle, Path } from 'react-native-svg';

const MarkerComponent = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="-5 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      data-name="Path 19"
      d="M11 1A10 10 0 0 0 1 11c0 5.523 10 20 10 20s10-14.477 10-20A10 10 0 0 0 11 1Zm0 13a3 3 0 1 1 3-3 3 3 0 0 1-3 3Z"
      fill="#cbff94"
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
)

export default MarkerComponent
