import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import StyledText from "../../../../components/StyledText";
import Like from "../../../../Icons/Like";
import Party from "../../../../Icons/Party";
import CalendarIcon from "../../../../Icons/CalendarIcon";
import Chat from "../../../../Icons/Chat";
import { useEffect, useState } from "react";
import getAllChats from "../../../../api/chat/getAllChats";
import CitasCiegas from "../../../../Icons/CitasCiegas";
import useScreenMode from "../../../../utilities/screenMode";
import useAuth from "../../../../utilities/login";
import menuEnabled from "../../../../api/menu/menuenabled";

export default function CitasCiegasPage() {

  const { getToken } = useAuth()

  const [menuOptions, setMenuOptions] = useState([
    {
      id: 0,
      text: "",
      selected: false,
      url: "",
      icon: <></>,
      active: false,
    },
  ]);

  useEffect(() => {
    const fetchChats = async () => {
      const token = await getToken() ?? ''
      const data = await getAllChats(token)
    }
    fetchChats()
  }, [])

  useEffect(() => {
    const getMenu = async () => {
      const matches = await menuEnabled({ key: 'matches' });
      const events = await menuEnabled({ key: 'events' });
      const calendar = await menuEnabled({ key: 'calendar' });
      const chat = await menuEnabled({ key: 'chat' });
      const citasCiegas = await menuEnabled({ key: 'ciegas' });
      const aux = []
      if (matches.Valor === '1') {
        aux.push({
          id: 1,
          text: "MATCHES",
          selected: false,
          url: "/matches",
          icon: <Like black />,
          active: false,
        });
      }
      if (events.Valor === '1') {
        aux.push(
          {
            id: 2,
            text: "EVENTS",
            selected: false,
            url: "/events",
            icon: <Party black />,
            active: false,
          }
        );
      }
      if (calendar.Valor === '1') {
        aux.push({
          id: 3,
          text: "CALENDAR",
          selected: false,
          url: "/calendar",
          icon: <CalendarIcon  black />,
          active: false,
        });
      }
      if (chat.Valor === '1') {
        aux.push({
          id: 4,
          text: 'CHAT',
          selected: false,
          url: '/chat',
          icon: <Chat black />,
          active: false,
        });
      }
      if (citasCiegas.Valor === '1') {
        aux.push({
          id: 5,
          text: 'CITAS A CIEGAS',
          selected: true,
          url: '/citasCiegas',
          icon: <CitasCiegas black />,
          active: true,
        });
      }
      setMenuOptions(aux);
    };
    getMenu();
  }, []);


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