import { View, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import StyledText from "../components/StyledText";
import { useEffect } from "react";
import { Colors } from "../constants/Colors";
import Btn from "../ux/Btn";
import useAuth from "../utilities/login";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import isPerfilCompletoAPI from "../api/login/isPerfilCompleto";
import useScreenMode from "../utilities/screenMode";
import { useTranslation } from "react-i18next";

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
          router.replace('/private/matches')
        } else if (!isPerfilCompleto?.perfilCompleto) {
          router.replace('/complete-profile')
        }
      }
    }
    checkLogin();
  }, [])

  const { mode } = useScreenMode()

  const calcBackgroundColor = () => {
    if (mode === 'light') {
      return Colors.light['palette-6'];
    } else if (mode === 'dark') {
      return Colors.dark['palette-6'];
    }
  }

  const { t } = useTranslation();

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
                {t('screens.intro.text.introTextLogin')}
              </StyledText>
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.container, { paddingHorizontal: 20, backgroundColor: (mode === 'dark') ? Colors.dark['palette-3'] : Colors.light['palette-3'], }]}>
          <View style={[styles.box, styles.box2, {
            backgroundColor: (mode === 'dark') ? Colors.dark["palette-3"] : Colors.light["palette-3"],
          }]}>
            <View style={[styles.mailPage, {
              backgroundColor: (mode === 'dark') ? Colors.dark["palette-3"] : Colors.light["palette-3"]
            }]}>
              <StyledText title bold>
                {t('screens.intro.text.introText')}<StyledText underline text={t('screens.intro.text.option1')} nextText={t('screens.intro.text.option2')} animationChange />
              </StyledText>
              <View style={{ marginBottom: 15 }}>
                <StyledText litle bold>
                  {t('screens.intro.terms.startText')}<StyledText underline><Link href='/terms'>{t('screens.intro.terms.text')}</Link></StyledText>. {t('screens.intro.terms.otherInfo')} <StyledText underline>{t('screens.intro.terms.privacy')}</StyledText> {t('y')} <StyledText underline>{t('screens.intro.terms.cookies')}</StyledText>.
                  {/* Al pulsar "Iniciar sesión", estás aceptando nuestros <StyledText underline><Link href='/terms'>Términos</Link></StyledText>. Obtén más información sobre cómo procesamos tus datos en nuestra <StyledText underline>Política de privacidad</StyledText> y <StyledText underline>Política de cookies</StyledText>. */}
                </StyledText>
                <Btn title={t('screens.intro.button.login_google')} onPress={handleLoginGoogle} google disabled />
                <Btn title={t('screens.intro.button.login_facebook')} onPress={handleLoginFacebook} facebook disabled />
                <Link href='/login' style={[styles.linkStyle, styles.button, {
                  backgroundColor: calcBackgroundColor(),
                }]}>
                  <StyledText button full center>
                    {t('screens.intro.button.login')}
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
