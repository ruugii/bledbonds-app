import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import Aficiones from "../Aficiones";
import { useEffect, useState } from "react";
import StyledText from "../StyledText";
import useScreenMode from "../../utilities/screenMode";

interface CardProps {
  readonly url: string[];
  readonly name: string;
  readonly age: string;
  readonly aficiones: string[];
  readonly description: string;
  readonly location: string;
  readonly children?: React.ReactNode;
  readonly like?: boolean;
  readonly dislike?: boolean;
}

export default function Card(props: CardProps) {
  const [aficiones] = useState<string[]>(props.aficiones);
  const [description] = useState<string>(props.description);
  const [location] = useState<string>(props.location);
  const [option, setOption] = useState<number>(Math.floor(Math.random() * 2));
  const [fotos] = useState<string[]>(props.url);
  const [selectedFoto, setSelectedFoto] = useState<string>(fotos[0]);
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);

  const { mode } = useScreenMode();

  const handleNextFoto = () => {
    if (indexSelected + 1 < fotos.length) {
      setIndexSelected(prev => prev + 1);
      setSelectedFoto(fotos[indexSelected + 1]);
      setOption(option + 1)
    } else {
      setIndexSelected(0);
      setSelectedFoto(fotos[0]);
      setOption(option + 1)
    }
  }

  const handlePrevFoto = () => {
    if (indexSelected - 1 >= 0) {
      setIndexSelected(prev => prev - 1);
      setSelectedFoto(fotos[indexSelected - 1]);
      setOption(option - 1)
    } else {
      setIndexSelected(fotos.length - 1);
      setSelectedFoto(fotos[fotos.length - 1]);
      setOption(option - 1)
    }
  }

  useEffect(() => {
    if (option === 0 && aficiones.length === 0) {
      setOption(1);
    } else if (option === 2 && location.length === 0) {
      setOption(1);
    } else if (option === 3) {
      setOption(0);
    } else if (option === -1) {
      setOption(2);
    }
  }, [option])

  useEffect(() => {
    calcularDistancia();
  }, []);

  const handleShowText = () => {
    setShowText(!showText);
  }

  const calcularDistancia = () => {
    return "0"
  }

  const calcOptions = () => {
    if (option === 0) {
      return <Aficiones name={aficiones} />;
    } else if (option === 1) {
      return <Aficiones name={[description]} text showText={showText} handleShowText={handleShowText} />
    } else {
      return <Aficiones name={[location]} />
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {props.like && (
          <View style={{
            position: 'absolute',
            top: 30,
            left: 0,
            marginTop: 10,
            marginRight: 10,
            paddingHorizontal: 24,
            zIndex: 100,
            borderColor: 'green',
            borderWidth: 4,
            borderRadius: 10,
            transform: [{ rotate: '-30deg' }],
            backgroundColor: 'lightgreen',
          }}
          >
            <StyledText title bold center mayus>
              LIKE
            </StyledText>
          </View>
        )}
        {props.dislike && (
          <View style={{
            position: 'absolute',
            top: 30,
            right: 0,
            marginTop: 10,
            marginRight: 10,
            paddingHorizontal: 24,
            zIndex: 100,
            borderColor: 'red',
            borderWidth: 4,
            borderRadius: 10,
            transform: [{ rotate: '30deg' }],
            backgroundColor: 'lightpink',
          }}
          >
            <StyledText title bold center mayus>
              DISLIKE
            </StyledText>
          </View>
        )}
        <ImageBackground source={{ uri: selectedFoto }} style={[styles.image, {
          zIndex: 100,
        }]}>
          {!showText ? (
            <>
              <View style={{ position: 'absolute', top: 0, right: 0, padding: 24, zIndex: 100 }}>
                <StyledText light litle>
                  {`${indexSelected + 1} / ${fotos.length}`}
                </StyledText>
              </View>
              <View style={[styles.card_filter, {
                backgroundColor: mode === 'dark' ? 'rgba(0,0,0, 0.7)' : 'rgba(255,255,255, 0.7)'
              }]}>
                <View style={styles.card_text}>
                  <StyledText light left title mayus>{props.name}</StyledText>
                  <StyledText light left litle mayus>{props.age}</StyledText>
                  <StyledText light left litle mayus>{`${calcularDistancia()} km`}</StyledText>
                </View>
                <View style={styles.buttonNext}>
                  <TouchableOpacity onPress={handlePrevFoto} style={{ padding: 10, borderRadius: 100 }}>
                    <StyledText light litle mayus>{'<'}</StyledText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleNextFoto} style={{ padding: 10, borderRadius: 100 }}>
                    <StyledText light litle mayus>{'>'}</StyledText>
                  </TouchableOpacity>
                </View>
                {calcOptions()}
                <View style={{ marginHorizontal: 20 }}>
                  {props.children}
                </View>
              </View>
            </>
          ) : (
            (
              <View style={[styles.card_filter, {
                backgroundColor: mode === 'dark' ? 'rgba(0,0,0, 0.7)' : 'rgba(255,255,255, 0.7)'
              }]}>
                {calcOptions()}
              </View>
            )
          )}
        </ImageBackground>
        <View style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 99,
          alignContent: 'center',
          justifyContent: 'center',
          padding: 24,
        }}>
          <StyledText light title center red>
            HA HABIDO UN ERROR AL CARGAR LA IMAGEN
          </StyledText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 0.85,
    // height: '95%',
    backgroundColor: 'white',
    // margin: 24,
    // marginVertical: 24,
    borderRadius: 14,
    overflow: 'hidden', // Asegura que el contenido respete el borderRadius
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden', // Asegura que la imagen respete el borderRadius
    height: '100%',
    width: '100%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  card_text: {
    padding: 24,
    paddingTop: 0,
    marginTop: 40
  },
  card_filter: {
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