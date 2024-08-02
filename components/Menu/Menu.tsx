import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "./Menu.styles";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link } from "expo-router";

interface options {
  id: number;
  text: string;
  selected: boolean;
  url: string;
  icon?: ReactNode;
  active?: boolean;
}

interface MenuProps {
  options: options[];
  margin?: boolean;
  private?: boolean;
}

export default function Menu(props: MenuProps) {

  const style = styles;

  const [options, setOptions] = useState(props.options)

  useEffect(() => {
    setOptions(props.options)
  }, [props.options])

  return (
    <View style={[style.box, style.box1, style.menu, props.margin ? style.menuMargin : {}, props.private ? style.private : {}, {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
      <ScrollView horizontal={true}>
        {options.map((option, index) => {
          return (
              <Link href={option.url} key={option.id}>
                {/* <TouchableOpacity onPress={() => onClick(option.id)}> */}
                <View key={option.id} style={style.menuItem} >
                  {option.icon && option.icon}
                  <Text style={[style.textStyles, (option.active ? {textDecorationLine: 'underline'} : {})]}>{option.text}</Text>
                </View>
                {index < options.length - 1 && <View style={style.menuItem}><Text style={[style.textStyles, {paddingHorizontal: 10}]}>|</Text></View>}
              </Link>
            
          )
        })}
      </ScrollView>
    </View>
  );
}