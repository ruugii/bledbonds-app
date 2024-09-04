import * as React from "react"
import { Path, Svg } from "react-native-svg"
import useScreenMode from "../utilities/screenMode"
import { Colors } from "../constants/Colors"
const Dislike = (props: any) => {
  const { mode } = useScreenMode()

  const calcFill = () => {
    // props.black ? mode==='light'? Colors.light["palette-11"] : Colors.dark["palette-11"] : 'rgba(255, 255, 255, 0)'
    if (props.black && mode === 'light') {
      return Colors.light["palette-11"];
    } else if (props.black && mode === 'dark') {
      return Colors.dark["palette-11"];
    } else {
      return 'rgba(255, 255, 255, 0)';
    }
  }

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        stroke={calcFill()}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 6 6 18M6 6l12 12"
      />
    </Svg>
  )
}
export default Dislike
