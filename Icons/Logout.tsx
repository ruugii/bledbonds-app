import Svg, { Path } from "react-native-svg";
import useScreenMode from "../utilities/screenMode";
import { Colors } from "../constants/Colors";

export default function Logout(props: any) {

  const { mode } = useScreenMode()

  const calcFill = () => {
    // props.black ? mode==='light'? Colors.light["palette-11"] : Colors.dark["palette-11"] : 'rgba(255, 255, 255, 0)'
    if (props.black && mode === 'light') {
      return Colors.light["palette-11"];
    } else if (props.black && mode === 'dark') {
      return Colors.dark["palette-11"];
    } else if (!props.black && mode === 'light') {
      return Colors.light["palette-11"];
    } else if (!props.black && mode === 'dark') {
      return Colors.dark["palette-11"];
    }
  }

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M21.9506 11H12.4142L15.7071 7.70711L14.2929 6.29289L9.29289 11.2929L8.58579 12L9.29289 12.7071L14.2929 17.7071L15.7071 16.2929L12.4142 13H21.9506C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.1853 2 21.4489 5.94668 21.9506 11Z" fill={calcFill()} />
    </Svg>
  )
}