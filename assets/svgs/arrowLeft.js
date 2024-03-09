import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgArrowLeft({ style, props, color }) {
  return (
    <Svg
      width={11}
      height={20}
      viewBox='0 0 11 20'
      fill='none'
      style={style}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <Path
        d='M10.597.403a1.377 1.377 0 010 1.946L3.32 9.633l7.278 7.285a1.376 1.376 0 01-1.944 1.946l-8.25-8.258a1.377 1.377 0 010-1.946L8.653.403a1.375 1.375 0 011.944 0z'
        fill={color}
      />
    </Svg>
  )
}

export default SvgArrowLeft
