import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconSearch({style, props, color}) {
    return (
        <Svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          style={style}
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M15.555 14.77l4.282 4.282a.556.556 0 01-.785.785l-4.283-4.282a8.889 8.889 0 11.786-.786zm-6.666 1.897a7.778 7.778 0 100-15.556 7.778 7.778 0 000 15.556z"
            fill={color}
          />
        </Svg>
  )
}

export default IconSearch
