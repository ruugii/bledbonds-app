import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import styles from "./Menu.styles";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

interface AficionesProps {
  name: string[]
  text?: boolean
  showText?: boolean,
  handleShowText?: () => void
}

export default function Aficiones(props: AficionesProps) {

  const style = styles;
  const [fullScreen, setFullScreen] = useState<boolean>(props.showText ? props.showText : false);

  useEffect(() => {
    console.log(fullScreen);
  }, [fullScreen])

  const handleChange = () => {
    setFullScreen(!fullScreen);
    if (props.handleShowText) {
      props.handleShowText();
    }
  }

  if (props.text) {
    return (
      <View style={[style.box, style.box1, style.menu, (fullScreen ? { maxHeight: '100%', height: '100%', top: 0 } : {})]}>
        {fullScreen ? (
          // <ScrollView style={{height: '100%'}}>
          props.name.map((option, index) => {
            return (
              <>
                <View key={index} style={[style.menuItem, { elevation: 0, height: '100%', backgroundColor: Colors.light.palette_1_transparent, margin: 0, paddingTop: 0 }]}>
                  <TouchableOpacity onPress={handleChange}>
                    <StyledText litle justify light>CLOSE</StyledText>
                  </TouchableOpacity>
                  <ScrollView>
                    <StyledText litle justify light>{option}</StyledText>
                  </ScrollView>
                </View>
              </>
            )
          })
          // </ScrollView>
        ) : (
          <>
            <TouchableOpacity onPress={handleChange} style={{ marginLeft: 20 }}>
              <StyledText litle light justify>Ver todas</StyledText>
            </TouchableOpacity>
            <ScrollView>
              {props.name.map((option, index) => {
                return (
                  <>
                    <View key={index} style={[style.menuItem, { backgroundColor: 'transparent', elevation: 0 }]}>
                      <StyledText litle light justify>{option}</StyledText>
                    </View>
                  </>
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
              <>
                <View key={index} style={style.menuItem}>
                  <StyledText litle>{option}</StyledText>
                </View>
              </>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}