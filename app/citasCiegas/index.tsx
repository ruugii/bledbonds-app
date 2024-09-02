import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../../components/StyledText";
import Like from "../../Icons/Like";
import Party from "../../Icons/Party";
import CalendarIcon from "../../Icons/CalendarIcon";
import Chat from "../../Icons/Chat";
import Menu from "../../components/Menu/Menu";
import { useEffect } from "react";
import getAllChats from "../../api/chat/getAllChats";
import CitasCiegas from "../../Icons/CitasCiegas";
import useScreenMode from "../../utilities/screenMode";

export default function ChatPage() {

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getAllChats()
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
              Citas a ciegas
            </StyledText>
          </View>
        </View >
        <Menu
          options={[
            {
              id: 1,
              text: "MATCHES",
              selected: true,
              url: "/matches",
              icon: <Like black />,
              active: false,
            },
            {
              id: 2,
              text: "EVENTS",
              selected: false,
              url: "/events",
              icon: <Party />,
              active: false,
            },
            {
              id: 3,
              text: "CALENDAR",
              selected: false,
              url: "/calendar",
              icon: <CalendarIcon />,
              active: false,
            },
            {
              id: 4,
              text: 'CHAT',
              selected: false,
              url: '/chat',
              icon: <Chat />,
              active: false,
            },
            {
              id: 5,
              text: 'CITAS A CIEGAS',
              selected: false,
              url: '/citasCiegas',
              icon: <CitasCiegas />,
              active: true,
            }
          ]}
        />
      </View >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
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