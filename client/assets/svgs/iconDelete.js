import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function IconDelete({props, style, color}) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_561_4144)" fill={color}>
        <Path d="M13.327 6.031a.753.753 0 00-1.064 0L9.5 8.794 6.738 6.03a.753.753 0 10-1.064 1.065l2.762 2.762-2.762 2.762a.753.753 0 001.064 1.065L9.5 10.922l2.76 2.761a.75.75 0 001.065 0 .752.752 0 000-1.064l-2.76-2.762 2.762-2.763a.753.753 0 000-1.064z" />
        <Path d="M9.501 0C4.262 0 0 4.262 0 9.501 0 14.74 4.262 19 9.501 19 14.74 19 19 14.739 19 9.501 19 4.262 14.74 0 9.501 0zm0 17.495c-4.409 0-7.995-3.586-7.995-7.994 0-4.409 3.587-7.995 7.995-7.995 4.408 0 7.993 3.587 7.993 7.995 0 4.408-3.586 7.994-7.993 7.994z" />
      </G>
      <Defs>
        <ClipPath id="clip0_561_4144">
          <Path fill="#fff" d="M0 0H18.9993V19H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconDelete
