import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconTime({props, style, color}) {
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
        d="M9.5 0a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 17.418A7.918 7.918 0 1117.418 9.5 7.933 7.933 0 019.5 17.418z"
        fill={color}
      />
      <Path
        d="M12.929 10.293L10.82 8.707l-.528-.395V3.957a.793.793 0 10-1.586 0v4.75a.784.784 0 00.09.35c.02.053.049.1.085.143 0 0 0 .024.024.03.033.038.07.073.11.104l.033.023 1.235.927 1.9 1.425a.793.793 0 00.95-1.268l-.205-.148z"
        fill={color}
      />
    </Svg>
  )
}

export default IconTime
