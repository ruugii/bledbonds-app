import { Path, Svg } from "react-native-svg";
import useScreenMode from "../utilities/screenMode";
import { Colors } from "../constants/Colors";

export default function EyeClose() {

  const { mode } = useScreenMode()

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={ mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }>
      <Path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z" />
      <Path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z" />
    </Svg>
  )
}