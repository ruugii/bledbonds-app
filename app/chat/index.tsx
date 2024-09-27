import { Link, router, Stack } from "expo-router";
import { ImageBackground, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../../components/StyledText";
import Like from "../../Icons/Like";
import Party from "../../Icons/Party";
import CalendarIcon from "../../Icons/CalendarIcon";
import Chat from "../../Icons/Chat";
import Menu from "../../components/Menu/Menu";
import { useEffect, useState } from "react";
import getAllChats from "../../api/chat/getAllChats";
import CitasCiegas from "../../Icons/CitasCiegas";
import useScreenMode from "../../utilities/screenMode";
import menuEnabled from "../../api/menu/menuenabled";
import getAllMatches from "../../api/user/getAllMatches";
import useAuth from "../../utilities/login";

export default function ChatPage() {

  const { getToken } = useAuth()

  useEffect(() => {
    const fetchChats = async () => {
      const token = await getToken() ?? ''
      const data = await getAllChats(token)
      setChats(data)
    }
    fetchChats()
  }, [])

  const [chats, setChats] = useState<{
    ID: number,
    name: string,
  }[]>([])

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

  const [matchList, setMatchList] = useState([
    {
      "id": 12,
      "email": "rbs3@g.com",
      "phone": "666666666",
      "passwd": "$2a$10$NMYr7J3kpZpIvGvCQ3R6.OCGCXGPkhN7KPgHhcv9G.Anhru5MpGLS",
      "isActive": 1,
      "id_genre": 1,
      "name": "Roger 1",
      "birthdate": "1992-05-30T22:00:00.000Z",
      "id_find": null,
      "id_orientation": null,
      "id_status": null,
      "bio": null,
      "height": null,
      "studyPlace": null,
      "you_work": null,
      "charge_work": null,
      "enterprise": null,
      "drink": null,
      "educative_level_id": null,
      "personality": null,
      "id_zodiac": null,
      "mascotas": null,
      "id_religion": null,
      "genre_name": "Hombre",
      "roleName": null,
      "findText": null,
      "orientationText": null,
      "statusText": null,
      "fotos": [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg"
      ],
      "link": "12",
    }
  ])

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
          icon: <CalendarIcon black />,
          active: false,
        });
      }
      if (chat.Valor === '1') {
        aux.push({
          id: 4,
          text: 'CHAT',
          selected: true,
          url: '/chat',
          icon: <Chat black />,
          active: true,
        });
      }
      if (citasCiegas.Valor === '1') {
        aux.push({
          id: 5,
          text: 'CITAS A CIEGAS',
          selected: false,
          url: '/citasCiegas',
          icon: <CitasCiegas black />,
          active: false,
        });
      }
      setMenuOptions(aux);
    };
    getMenu();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = await getToken() ?? ''
      const data = await getAllMatches({ token })
      setMatchList(data.matchList)
    }
    fetchMatches()
  }, [])

  const { mode } = useScreenMode()

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => null,
        }}
      />

      <View style={
        [
          styles.container,
          { backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"], }
        ]
      }>
        <View style={[
          styles.box,
          styles.box1,
          // styles.menu,
          {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
            flex: 1.5,
            marginHorizontal: 20,
          }
        ]}>
          <ScrollView horizontal={true}>
            {
              matchList.map((match, index) => (
                <View key={index + 1} style={{ alignItems: 'center', marginHorizontal: 5 }}>
                  <TouchableOpacity onPress={() => {
                    router.push(`/chat/${match.link}`)
                  }}>
                    <View
                      style={{
                        borderRadius: 25, // half of the width and height to make it fully circular
                        overflow: 'hidden', // this ensures the image stays within the circle
                        backgroundColor: mode === 'light' ? Colors.light['palette-5'] : Colors.dark['palette-5'],
                        marginVertical: 'auto',
                        marginHorizontal: 10,
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}
                    >
                      <ImageBackground
                        source={{ uri: match.fotos[0] }}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </View>
                    <View>
                      <StyledText xsmall bold>
                        {match.name}
                      </StyledText>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
          </ScrollView>
        </View>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          marginHorizontal: 20,
        }]}>
          <View style={[styles.mailPage, {
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"]
          }]}>
            <ScrollView>
              {chats.map((chat, index) => (
                <Link href={`/chat/${chat.ID}`} key={index + 1} style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: (mode === 'light') ? Colors.light['palette-5'] : Colors.dark['palette-5'],
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
        <Menu options={menuOptions} />
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
    height: '100%',
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
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // borderBottomWidth: 1,
    width: '100%',
  },
});