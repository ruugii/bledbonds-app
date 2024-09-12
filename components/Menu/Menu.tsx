import { ScrollView, View } from "react-native";
import styles from "./Menu.styles";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "expo-router";
import StyledText from "../StyledText";

interface Options {
  id: number;
  text: string;
  selected: boolean;
  url: string;
  icon?: ReactNode;
  active?: boolean;
}

interface MenuProps {
  readonly options: Options[];
  readonly margin?: boolean;
  readonly private?: boolean;
}

export default function Menu(props: MenuProps) {

  const style = styles;

  const [options, setOptions] = useState(props.options)

  useEffect(() => {
    setOptions(props.options)
  }, [props.options])

  return (
    <View
      style={
        [
          style.box,
          style.box1,
          style.menu,
          props.margin ? style.menuMargin : {},
          props.private ? style.private : {},
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        ]
      }
    >
      <ScrollView horizontal={true}>
        {options.map((option, index) => {
          return (
            <Link href={option.url} key={option.id}>
              <View key={option.id} style={style.menuItem} >
                {option.icon ? option.icon : null}
                <StyledText litle underline={option.active}>
                  {option.text}
                </StyledText>
              </View>
              {index < options.length - 1 && <View style={[style.menuItem, {
                paddingHorizontal: 10,
              }]}>
                <StyledText litle>
                  |
                </StyledText>
              </View>}
            </Link>
          )
        })}
      </ScrollView>
    </View>
  );
}