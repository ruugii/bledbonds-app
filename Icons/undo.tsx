import { Path, Svg } from "react-native-svg";
import useScreenMode from "../utilities/screenMode";
import { Colors } from "../constants/Colors";

export default function Undo(props: any) {

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
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M14 15L10 19L14 23" stroke={calcFill()} stroke-width="2"/>
      <Path d="M18.0622 8.5C18.6766 9.56413 19 10.7712 19 12C19 13.2288 18.6766 14.4359 18.0622 15.5C17.4478 16.5641 16.5641 17.4478 15.5 18.0622C14.4359 18.6766 13.2288 19 12 19" stroke={calcFill()} stroke-width="2" stroke-linecap="round"/>
      <Path d="M10 9L14 5L10 1" stroke={calcFill()} stroke-width="2"/>
      <Path d="M5.93782 15.5C5.32344 14.4359 5 13.2288 5 12C5 10.7712 5.32344 9.56413 5.93782 8.5C6.5522 7.43587 7.43587 6.5522 8.5 5.93782C9.56413 5.32344 10.7712 5 12 5" stroke={calcFill()} stroke-width="2" stroke-linecap="round"/>
    </Svg>
  )
}