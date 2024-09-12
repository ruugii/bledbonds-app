import { Path, Rect, Svg } from "react-native-svg";
import useScreenMode from "../utilities/screenMode";
import { Colors } from "../constants/Colors";

interface ChatProps {
  readonly black?: boolean;
}

export default function Chat(props: ChatProps) {

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
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <Rect
      x={4}
      y={6}
      width={16}
      height={12}
      rx={2}
      stroke={calcFill()}
      strokeWidth={2}
    />
    <Path
      d="M4 9L11.1056 12.5528C11.6686 12.8343 12.3314 12.8343 12.8944 12.5528L20 9"
      stroke={calcFill()}
      strokeWidth={2}
    />
  </Svg>
  )
}