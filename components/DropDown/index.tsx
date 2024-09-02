import { TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import useScreenMode from "../../utilities/screenMode";

interface DropDownProps {
  readonly title: string;
  readonly response?: string;
  readonly children: React.ReactNode;
}

export default function DropDown(props: DropDownProps) {
  
  const [open, setOpen] = useState(false);

  const { mode } = useScreenMode()

  return (
    <View style={{
      borderBottomColor: mode==='light'? Colors.light["palette-11"] : Colors.dark["palette-11"],
      borderBottomWidth: 1,
      paddingBottom: 10,
    }}>
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <StyledText subtitle left>
            {props.title}
          </StyledText>
          <StyledText xsmall>
            {!open ? "▼" : "▲"}
          </StyledText>
        </View>
        <View>
          {(props.response && !open) && (
            <StyledText xsmall left>
              {props.response}
            </StyledText>
          )}
        </View>
      </TouchableOpacity>
      {open && props.children}
    </View>
  )
}