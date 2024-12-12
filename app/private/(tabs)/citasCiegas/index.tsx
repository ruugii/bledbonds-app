import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import StyledText from "../../../../components/StyledText";
import { useEffect } from "react";
import getAllChats from "../../../../api/chat/getAllChats";
import useScreenMode from "../../../../utilities/screenMode";
import useAuth from "../../../../utilities/login";
import { useTranslation } from "react-i18next";

export default function CitasCiegasPage() {

  const { getToken } = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchChats = async () => {
      const token = await getToken() ?? ''
      const data = await getAllChats(token)
    }
    fetchChats()
  }, [])


  const { mode } = useScreenMode()

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => null,
        }}
      />
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <View style={[styles.mailPage, {
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"]
          }]}>
            <StyledText title bold mayus>
              {t('pages.citasCiegas.title')}
            </StyledText>
          </View>
        </View >
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  imputCode: {
    marginTop: 10,
  },
  linkStyle: {
    textDecorationLine: 'none', // Elimina la decoración por defecto
    display: 'flex', // Asegura que el Link use flex
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    width: '100%', // Ancho del 100%
    marginTop: 10, // Margen superior de 10
  },
  mailPage: {
    flex: 1,
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