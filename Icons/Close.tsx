import { Path, Svg } from "react-native-svg";
import useScreenMode from "../utilities/screenMode";
import { Colors } from "../constants/Colors";

interface CloseIconProps {
  readonly black?: boolean;
}

export default function CloseIcon(props: CloseIconProps) {
  const { mode } = useScreenMode()

  const {
    black
  } = props;

  const calcColor = () => {
    if (black && mode === 'light') {
      return Colors.light["palette-1"];
    } else if (black && mode === 'dark') {
      return Colors.dark["palette-1"];
    } else if (!black && mode === 'light') {
      return Colors.light["palette-11"];
    } else if (!black && mode === 'dark') {
      return Colors.dark["palette-11"];
    }
  }

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18" stroke={ calcColor() } stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M6 6L18 18" stroke={ calcColor() } stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}