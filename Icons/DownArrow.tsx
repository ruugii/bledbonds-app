import { Path, Svg } from "react-native-svg";
import { Colors } from "../constants/Colors";
import useScreenMode from "../utilities/screenMode";

export default function DownArrowIcon() {
  const { mode } = useScreenMode()
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M12 20L11.2929 20.7071L12 21.4142L12.7071 20.7071L12 20ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5L13 5ZM5.29289 14.7071L11.2929 20.7071L12.7071 19.2929L6.70711 13.2929L5.29289 14.7071ZM12.7071 20.7071L18.7071 14.7071L17.2929 13.2929L11.2929 19.2929L12.7071 20.7071ZM13 20L13 5L11 5L11 20L13 20Z" fill={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]} />
    </Svg>
  )
}