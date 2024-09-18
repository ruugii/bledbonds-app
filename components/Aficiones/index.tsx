import { ScrollView, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import styles from "./Menu.styles";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import useScreenMode from "../../utilities/screenMode";

interface AficionesProps {
  readonly name: string[]
  readonly text?: boolean
  readonly showText?: boolean,
  readonly handleShowText?: () => void
}

export default function Aficiones(props: AficionesProps) {

  const style = styles;
  const [fullScreen, setFullScreen] = useState<boolean>(props.showText ? props.showText : false);

  useEffect(() => {
  }, [fullScreen])

  const handleChange = () => {
    setFullScreen(!fullScreen);
    if (props.handleShowText) {
      props.handleShowText();
    }
  }

  const { mode } = useScreenMode()

  if (props.text) {
    return (
      <View style={[style.box, style.box1, style.menu, (fullScreen ? { maxHeight: '100%', height: '100%', top: 0 } : {})]}>
        {fullScreen ? (
          // <ScrollView style={{height: '100%'}}>
          props.name.map((option, index) => {
            return (
              <View key={index + 1} style={[style.menuItem, { elevation: 0, height: '100%', backgroundColor: mode === 'light' ? Colors.light["palette-1_transparent"] : Colors.dark["palette-1_transparent"], margin: 0, paddingTop: 0 }]}>
                <TouchableOpacity onPress={handleChange}>
                  <StyledText litle justify>CLOSE</StyledText>
                </TouchableOpacity>
                <ScrollView>
                  <StyledText litle justify>{option}</StyledText>
                </ScrollView>
              </View>
            )
          })
          // </ScrollView>
        ) : (
          <>
            <TouchableOpacity onPress={handleChange} style={{ marginLeft: 20 }}>
              <StyledText litle justify>Ver todas</StyledText>
            </TouchableOpacity>
            <ScrollView>
              {props.name.map((option, index) => {
                return (
                  <View key={index + 1} style={[style.menuItem, { backgroundColor: mode === 'light' ? Colors.light["palette-1"] : Colors.dark["palette-1"], elevation: 0 }]}>
                    <StyledText litle justify>{option}</StyledText>
                  </View>
                )
              })}
            </ScrollView>
          </>
        )}
      </View>
    )
  } else {
    return (
      <View style={[style.box, style.box1, style.menu]}>
        <ScrollView horizontal={true}>
          {props.name.map((option, index) => {
            return (
              <View key={index + 1} style={[style.menuItem, {
                backgroundColor: mode === 'light' ? Colors.light["palette-1"] : Colors.dark["palette-1"],
              }]}>
                <StyledText litle>{option}</StyledText>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}