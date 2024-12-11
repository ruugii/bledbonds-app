import * as React from "react";
import { Path, Svg } from "react-native-svg";
import { Colors } from "../constants/Colors";
import useScreenMode from "../utilities/screenMode";
const CalendarIcon = (props : any) => {

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
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill={calcFill()}
      style={{
        transform: "",
        msfilter: "",
      }}
      {...props}
    >
      <Path d="M21 20V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zM9 18H7v-2h2v2zm0-4H7v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2zm2-5H5V7h14v2z" />
    </Svg>
  );
}
export default CalendarIcon;
