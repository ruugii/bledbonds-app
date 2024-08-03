import { View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import StyledText from "../components/StyledText";
import { useEffect } from "react";
import { Colors } from "../constants/Colors";
import Btn from "../ux/Btn";
import useAuth from "../utilities/login";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import isPerfilCompletoAPI from "../api/login/isPerfilCompleto";

export default function IndexPage() {
  const { isLoggedIn, login, getIsLoggedIn, getToken } = useAuth();

  const handleLoginGoogle = async () => {
    console.log('Login with Google');
    await login(true); // Simulamos que el login es exitoso
  }

  const handleLoginFacebook = async () => {
    console.log('Login with Facebook');
    await login(true); // Simulamos que el login es exitoso
  }

  useEffect(() => {
    console.log('IndexPage: ', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const checkLogin = async () => {
      const value = await getIsLoggedIn();
      console.log(value);
      const token = await getToken() || '';
      const isPerfilCompleto = await isPerfilCompletoAPI({ token })
      if (value && isPerfilCompleto?.perfilCompleto) {
        console.log('Usuario logueado');
        router.replace('/matches')
      } else if (value && !isPerfilCompleto?.perfilCompleto) {
        router.replace('/complete-profile')
      }
    }
    checkLogin();
  }, [])

  return (
    <GestureHandlerRootView>
    {isLoggedIn ? (
      <View style={styles.container}>
        <View style={[styles.box, styles.box2, { marginHorizontal: 20 }]}>
          <View style={styles.mailPage}>
            <StyledText title bold>
              ESTA ES LA PÁGINA DE INICIO CON LOGIN
            </StyledText>
          </View>
        </View>
      </View>
    ) : (
      <View style={[styles.container, {paddingHorizontal: 20}]}>
        <View style={[styles.box, styles.box2]}>
          <View style={styles.mailPage}>
            <StyledText title bold>
              Todo empieza con un simple <StyledText underline text="ME GUSTA" nextText="LIKE" animationChange />
            </StyledText>
            <View style={{marginBottom: 15}}>
              <StyledText litle bold>
                Al pulsar "Iniciar sesión", estás aceptando nuestros <StyledText underline>Términos</StyledText>. Obtén más información sobre cómo procesamos tus datos en nuestra <StyledText underline>Política de privacidad</StyledText> y <StyledText underline>Política de cookies</StyledText>.
              </StyledText>
              <Btn title="Iniciar sesión con Google" onPress={handleLoginGoogle} google disabled/>
              <Btn title="Iniciar sesión con Facebook" onPress={handleLoginFacebook} facebook disabled/>
              <Link href='/login/code' style={[styles.linkStyle, styles.button]}>
                <StyledText button full center>
                  Iniciar sesión con correo
                </StyledText>
              </Link>
            </View>
          </View>
        </View>
      </View>
    )}
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  linkStyle: {
    textDecorationLine: 'none',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.light['palette-3'],
    paddingHorizontal: 0,
  },
  mailPage: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.light["palette-3"]
  },
  box: {
    flex: 1,
  },
  box1: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 10,
    height: '100%',
    backgroundColor: Colors.light["palette-3"],
  },
  box3: {
    flex: 0.5,
  },
  button: {
    borderRadius: 15,
    backgroundColor: Colors.light['palette-6'],
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
});
