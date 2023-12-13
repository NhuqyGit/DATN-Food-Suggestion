import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgPer1 = ({style, props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    style={style}
    {...props}
  >
    <Path
      fill="#BDBDBD"
      d="M48 24c0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0s24 10.745 24 24ZM4.8 24c0 10.604 8.596 19.2 19.2 19.2S43.2 34.604 43.2 24 34.604 4.8 24 4.8 4.8 13.396 4.8 24Z"
    />
    <Path
      fill="#FF6321"
      d="M48 24A24 24 0 0 0 24 0v4.782A19.219 19.219 0 0 1 43.218 24H48Z"
    />
  </Svg>
)
export default SvgPer1
