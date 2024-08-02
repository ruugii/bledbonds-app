import { Link, Stack } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../../components/StyledText";
import Calendar from "../../components/Calendar/page";
import Like from "../../Icons/Like";
import Party from "../../Icons/Party";
import CalendarIcon from "../../Icons/CalendarIcon";
import Chat from "../../Icons/Chat";
import Menu from "../../components/Menu/Menu";
import { useEffect, useState } from "react";
import getAllChats from "../../api/chat/getAllChats";
import CitasCiegas from "../../Icons/CitasCiegas";

export default function ChatPage() {

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getAllChats()
      console.log(data);
      setChats(data)
    }
    fetchChats()
    
  }, [])

  const [chats, setChats] = useState<{
    ID: number,
    name: string,
  }[]>([])

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => null,
        }}
      />
      <View style={[styles.container]}>
        <View style={[styles.box, styles.box2]}>
          <View style={[styles.mailPage]}>
            <ScrollView>
              {chats.map((chat) => (
                <Link href={`/chat/${chat.ID}`} key={chat.ID} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.light['palette-5'],
                  flex: 1,
                  alignContent: 'center',
                  marginBottom: 10,
                  padding: 8,
                }}>
                  <StyledText subtitle bold mayus>
                    {chat.name}
                  </StyledText>
                </Link>
              ))}
            </ScrollView>
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
              active: true,
            },
            {
              id: 5,
              text: 'CITAS A CIEGAS',
              selected: false,
              url: '/citasCiegas',
              icon: <CitasCiegas />,
              active: false,
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
    backgroundColor: Colors.light["palette-3"],
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  imput: {
    borderWidth: 1,
    borderColor: Colors.light["palette-1"],
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