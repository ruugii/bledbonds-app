import React from "react";
import { View } from "react-native";
import styles from "./Menu.styles";
import StyledText from "../StyledText";

interface CounterFotosProps {
  readonly fotos: string[];
  readonly selectedFoto: number;
}

export default function CounterFotos(props: CounterFotosProps) {
  return (
    <View style={styles.menu}>
      <StyledText light litle mayus>{`${props.selectedFoto + 1}/${props.fotos.length}`}</StyledText>
    </View>
  );
}
