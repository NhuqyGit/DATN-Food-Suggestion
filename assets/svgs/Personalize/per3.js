import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgPer3({ style, props }) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={style}
      {...props}
    >
      <Path
        d='M48 24c0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0s24 10.745 24 24zM4.8 24c0 10.604 8.596 19.2 19.2 19.2S43.2 34.604 43.2 24 34.604 4.8 24 4.8 4.8 13.396 4.8 24z'
        fill='#BDBDBD'
      />
      <Path
        d='M0 24A24 24 0 1024 0v4.782A19.219 19.219 0 114.782 24H0z'
        fill='#FF6321'
      />
    </Svg>
  )
}

export default SvgPer3
