import { TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import { useState } from "react";
import { Colors } from "../../constants/Colors";

interface dropDownProps {
  title: string;
  response?: string;
  children: React.ReactNode;
}

export default function DropDown(props: dropDownProps) {
  
  const [open, setOpen] = useState(false);

  return (
    <View style={{
      borderBottomColor: Colors.light["palette-11"],
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