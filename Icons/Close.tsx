import { Path, Svg } from "react-native-svg";
import useScreenMode from "../utilities/screenMode";
import { Colors } from "../constants/Colors";

export default function CloseIcon() {
  const { mode } = useScreenMode()
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18" stroke={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M6 6L18 18" stroke={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  )
}