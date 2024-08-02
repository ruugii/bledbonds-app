import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import styles from "./Menu.styles";
import TextStyled from "../Title";

interface CounterFotosProps {
  fotos: string[];
  selectedFoto: number;
}

export default function CounterFotos(props: CounterFotosProps) {
  return (
    <View style={styles.menu}>
      <TextStyled light litle mayus>{`${props.selectedFoto + 1}/${props.fotos.length}`}</TextStyled>
    </View>
  );
}
