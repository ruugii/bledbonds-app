import { Path, Svg } from "react-native-svg";
import { Colors } from "../constants/Colors";
import useScreenMode from "../utilities/screenMode";

export default function Like(props:any) {

  const { mode } = useScreenMode()

  const calcFill = () => {
    // props.black ? mode==='light'? Colors.light["palette-11"] : Colors.dark["palette-11"] : 'rgba(255, 255, 255, 0)'
    if (props.black && mode === 'light') {
      return Colors.light["palette-11"];
    } else if (props.black && mode === 'dark') {
      return Colors.dark["palette-11"];
    } else if (!props.black && mode === 'light') {
      return Colors.light["palette-10"];
    } else if (!props.black && mode === 'dark') {
      return Colors.dark["palette-10"];
    }
  }

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={calcFill()} >
      <Path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" stroke={calcFill()} stroke-width="2"/>
    </Svg>
  )
}