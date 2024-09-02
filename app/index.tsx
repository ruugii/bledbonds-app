import { View, StyleSheet, Appearance } from "react-native";
import { Link, router } from "expo-router";
import StyledText from "../components/StyledText";
import { useEffect } from "react";
import { Colors } from "../constants/Colors";
import Btn from "../ux/Btn";
import useAuth from "../utilities/login";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import isPerfilCompletoAPI from "../api/login/isPerfilCompleto";
import useScreenMode from "../utilities/screenMode";

export default function IndexPage() {
  const { isLoggedIn, login, getIsLoggedIn, getToken } = useAuth();

  const handleLoginGoogle = async () => {
    await login(true); // Simulamos que el login es exitoso
  }

  const handleLoginFacebook = async () => {
    await login(true); // Simulamos que el login es exitoso
  }

  useEffect(() => {
    const checkLogin = async () => {
      const value = await getIsLoggedIn();
      const token = await getToken() ?? '';
      if (value) {
        const isPerfilCompleto = await isPerfilCompletoAPI({ token }) ?? false;
        if (isPerfilCompleto?.perfilCompleto) {
          router.replace('/matches')
        } else if (!isPerfilCompleto?.perfilCompleto) {
          router.replace('/complete-profile')
        }
      }
    }
    checkLogin();
  }, [])

  const { mode } = useScreenMode()

  const calcBackgroundColor = () => {
    if (mode==='light') {
      return Colors.light['palette-6'];
    } else if (mode==='dark') {
      return Colors.dark['palette-6'];
    }
  }

  return (
    <GestureHandlerRootView>
    {isLoggedIn ? (
      <View style={[styles.container, {
        backgroundColor: (mode === 'dark') ? Colors.dark['palette-3'] : Colors.light['palette-3'],
      }]}>
        <View style={[styles.box, styles.box2, { marginHorizontal: 20, backgroundColor: (mode === 'dark') ? Colors.dark["palette-3"] : Colors.light["palette-3"], }]}>
          <View style={[styles.mailPage, {
            backgroundColor: (mode === 'dark') ? Colors.dark["palette-3"] : Colors.light["palette-3"]
          }]}>
            <StyledText title bold>
              ESTA ES LA PÁGINA DE INICIO CON LOGIN
            </StyledText>
          </View>
        </View>
      </View>
    ) : (
      <View style={[styles.container, {paddingHorizontal: 20, backgroundColor: (mode === 'dark') ? Colors.dark['palette-3'] : Colors.light['palette-3'],}]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'dark') ? Colors.dark["palette-3"] : Colors.light["palette-3"],
        }]}>
          <View style={[styles.mailPage, {
            backgroundColor: (mode === 'dark') ? Colors.dark["palette-3"] : Colors.light["palette-3"]
          }]}>
            <StyledText title bold>
              Todo empieza con un simple <StyledText underline text="ME GUSTA" nextText="LIKE" animationChange />
            </StyledText>
            <View style={{marginBottom: 15}}>
              <StyledText litle bold>
                Al pulsar "Iniciar sesión", estás aceptando nuestros <StyledText underline><Link href='/terms'>Términos</Link></StyledText>. Obtén más información sobre cómo procesamos tus datos en nuestra <StyledText underline>Política de privacidad</StyledText> y <StyledText underline>Política de cookies</StyledText>.
              </StyledText>
              <Btn title="Iniciar sesión con Google" onPress={handleLoginGoogle} google disabled/>
              <Btn title="Iniciar sesión con Facebook" onPress={handleLoginFacebook} facebook disabled/>
              <Link href='/login/code' style={[styles.linkStyle, styles.button, {
                backgroundColor: calcBackgroundColor(),
              }]}>
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
    paddingHorizontal: 0,
  },
  mailPage: {
    flex: 1,
    justifyContent: 'space-between',
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
  },
  box3: {
    flex: 0.5,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
});
