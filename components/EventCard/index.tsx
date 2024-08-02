import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import Aficiones from "../Aficiones";
import { useEffect, useState } from "react";
import CounterFotos from "../CounterFotos";

interface CardProps {
  url: string[];
  name: string;
  description: string;
  location: string;
}

export default function EventCard(props: CardProps) {
  const [option, setOption] = useState<number>(Math.floor(Math.random() * 3)); // Adjusted random range to 0-2
  const [showText, setShowText] = useState<boolean>(false);
  const [selectedFoto, setSelectedFoto] = useState<string>(props.url[0]);

  useEffect(() => {
    if (option === 3) {
      setOption(0);
    } else if (option === -1) {
      setOption(2);
    }
  }, [option]);

  useEffect(() => {
    calcularDistancia();
  }, []);

  const handleShowText = () => {
    setShowText(!showText);
  };

  const calcularDistancia = () => {
    // This function currently returns a hardcoded "0". Implement your logic here.
    return "0";
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: selectedFoto }} style={styles.image}>
          <View style={styles.card_filter}>
            <View style={styles.card_text}>
              <StyledText light left title mayus>{props.name}</StyledText>
              <StyledText light left litle mayus>{`${calcularDistancia()} km`}</StyledText>
              <StyledText light left litle>{props.location}</StyledText>
              {showText ? (
                <>
                  <StyledText light left litle>{props.description}</StyledText>
                  <TouchableOpacity onPress={handleShowText}>
                    <StyledText light left litle underline>APUNTARSE</StyledText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleShowText}>
                    <StyledText light left litle underline>{showText ? "VER MENOS" : "VER MAS"}</StyledText>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={handleShowText}>
                    <StyledText light left litle underline>{showText ? "VER MENOS" : "VER MAS"}</StyledText>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'blue',
    margin: 24,
    marginBottom: 5,
    borderRadius: 14,
    overflow: 'hidden', // Asegura que el contenido respete el borderRadius
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden', // Asegura que la imagen respete el borderRadius
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  card_text: {
    padding: 24,
  },
  card_filter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    // padding: 24,
  },
  buttonNext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: '93%',
    width: '100%',
    alignItems: 'center',
  }
});
