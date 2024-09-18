import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import Aficiones from "../Aficiones";
import { useEffect, useState } from "react";
import StyledText from "../StyledText";
import useScreenMode from "../../utilities/screenMode";
import * as Location from 'expo-location';

interface CardProps {
  readonly url: string[];
  readonly name: string;
  readonly age: string;
  readonly aficiones: string[];
  readonly description: string;
  readonly location: {
    lat: number;
    lon: number;
  };
  readonly children?: React.ReactNode;
  readonly like?: boolean;
  readonly dislike?: boolean;
}

export default function Card(props: CardProps) {
  const [aficiones] = useState<string[]>(props.aficiones);
  const [description] = useState<string>(props.description);
  const [option, setOption] = useState<number>(Math.floor(Math.random() * 2));
  const [fotos] = useState<string[]>(props.url);
  const [selectedFoto, setSelectedFoto] = useState<string>(fotos[0]);
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const [showText, setShowText] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('ALERT: Location permissions are not granted');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }

    getLocation();
  }, [])

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
    } else if (option === 2) {
      setOption(0);
    } else if (option === 3) {
      setOption(0);
    } else if (option === -1) {
      setOption(1);
    }
  }, [option])

  useEffect(() => {
    calcularDistancia(latitude, longitude, props.location.lat, props.location.lon);
  }, []);

  const handleShowText = () => {
    setShowText(!showText);
  }

  function calcularDistancia(lat1 : number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radio de la Tierra en km
    const toRad = x => x * Math.PI / 180; // Convertir grados a radianes

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = R * c; // Distancia en km
    distance = Number(distance.toFixed(2));
    return distance;
  }

  const calcOptions = () => {
    if (option === 0) {
      return <Aficiones name={aficiones} />;
    } else if (option === 1) {
      return <Aficiones name={[description]} text showText={showText} handleShowText={handleShowText} />
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
                <StyledText litle>
                  {`${indexSelected + 1} / ${fotos.length}`}
                </StyledText>
              </View>
              <View style={[styles.card_filter, {
                backgroundColor: mode === 'dark' ? 'rgba(0,0,0, 0.7)' : 'rgba(255,255,255, 0.7)'
              }]}>
                <View style={styles.card_text}>
                  <StyledText left title mayus>{props.name}</StyledText>
                  <StyledText left litle mayus>{props.age}</StyledText>
                  <StyledText left litle mayus>{`${calcularDistancia(latitude, longitude, props.location.lat, props.location.lon)} km`}</StyledText>
                </View>
                <View style={styles.buttonNext}>
                  <TouchableOpacity onPress={handlePrevFoto} style={{ padding: 10, borderRadius: 100 }}>
                    <StyledText litle mayus>{'<'}</StyledText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleNextFoto} style={{ padding: 10, borderRadius: 100 }}>
                    <StyledText litle mayus>{'>'}</StyledText>
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
          <StyledText title center red>
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