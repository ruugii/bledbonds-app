import { ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import { useEffect, useState } from "react";
import CloseIcon from "../../Icons/Close";
import { Colors } from "../../constants/Colors";
import useScreenMode from "../../utilities/screenMode";
import useAuth from "../../utilities/login";
import addToEvent from "../../api/events/addToEvent";

interface CardProps {
  readonly id: number;
  readonly url: string[];
  readonly name: string;
  readonly description: string;
  readonly location: string;
}

export default function EventCard(props: CardProps) {

  const { getToken } = useAuth();

  const [option, setOption] = useState<number>(Math.floor(Math.random() * 3)); // Adjusted random range to 0-2
  const [showText, setShowText] = useState<boolean>(false);
  const [selectedFoto] = useState<string>(props.url[0]);

  const { mode } = useScreenMode();

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

  const calcBackgroundColor = () => {
    if (mode === 'light') {
      return Colors.light['palette-3'];
    } else if (mode === 'dark') {
      return Colors.dark['palette-3'];
    }
  }

  const apuntarse = (id : number) => {
    const getTokenData = async () => {
      const token = await getToken() ?? ''
      console.log(token);
      
      await addToEvent(token, `${id}`)
    }

    getTokenData()

    setShowText(!showText);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: selectedFoto }} style={styles.image}>
          <View style={[styles.card_filter, { backgroundColor: mode === 'dark' ? 'rgba(0,0,0, 0.7)' : 'rgba(255,255,255, 0.7)' }]}>
            <View style={styles.card_text}>
              {showText ? (
                <Modal>
                  <View style={{
                    backgroundColor: calcBackgroundColor(),
                    height: '100%',
                    width: '100%',
                    alignContent: 'center',
                    justifyContent: 'center',
                    zIndex: 90,
                  }}>
                    <TouchableOpacity onPress={() => setShowText(!showText)} style={{ zIndex: 200 }}>
                      <View style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        padding: 24,
                        zIndex: 100,
                      }}>
                        <CloseIcon />
                      </View>
                    </TouchableOpacity>
                    <View style={{
                      marginTop: 40,
                      paddingHorizontal: 24,
                    }}>
                      <StyledText title mayus>{props.name}</StyledText>
                    </View>
                    <ScrollView style={{
                      paddingHorizontal: 24,
                    }}>
                      <StyledText litle justify>{props.description}</StyledText>
                    </ScrollView>
                    <View style={{
                      width: '100%',
                      position: 'absolute',
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: calcBackgroundColor(),
                      paddingVertical: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}>
                      <TouchableOpacity
                        onPress={() => apuntarse(props.id)}
                        style={{
                          flex: 1,
                          elevation: 15,
                          marginBottom: 10,
                          width: '50%',
                          marginLeft: 25,
                        }}
                      >
                        <StyledText left litle underline>APUNTARSE</StyledText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowText(!showText)}
                        style={{
                          flex: 1,
                          elevation: 15,
                          marginBottom: 10,
                          width: '50%',
                          marginRight: 25,
                        }}
                      >
                        <StyledText right litle underline>{showText ? "VER MENOS" : "VER MAS"}</StyledText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              ) : (
                <>
                  <StyledText left title mayus>{props.name}</StyledText>
                  <StyledText left litle mayus>{`${calcularDistancia()} km`}</StyledText>
                  <StyledText left litle>{props.location}</StyledText>
                  <TouchableOpacity onPress={handleShowText}>
                    <StyledText left litle underline>{showText ? "VER MENOS" : "VER MAS"}</StyledText>
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
