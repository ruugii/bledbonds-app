import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import useAuth from "../../utilities/login";
import { useEffect, useState } from "react";
import getAllEvents from "../../api/events/getAllEvents";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import EventCard from "../../components/EventCard";
import Menu from "../../components/Menu/Menu";
import Like from "../../Icons/Like";
import Party from "../../Icons/Party";
import CalendarIcon from "../../Icons/CalendarIcon";
import Chat from "../../Icons/Chat";
import CitasCiegas from "../../Icons/CitasCiegas";

export default function Match() {
  const { isLoggedIn, login } = useAuth();

  const [events, setEvents] = useState<{ eventImageURL: string, event_name: string, event_date: string, event_location: string, event_description: string, id: number }[]>([{
    eventImageURL: '',
    event_name: '',
    event_date: '',
    event_location: '',
    event_description: '',
    id: 0
  }]);

  useEffect(() => {
    const fetchEventsData = async () => {
      const data = await getAllEvents()
      console.log(data);

      setEvents(data)
    }

    fetchEventsData()
  }, [])

  if (!isLoggedIn) {
    return <></>;
  } else {
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
              <GestureHandlerRootView>
                <FlatList
                  data={events}
                  numColumns={1}
                  renderItem={({ item }) =>
                  (<EventCard
                    name={item.event_name || 'No name'}
                    description={item.event_description || 'No description'}
                    location={item.event_location || 'No location'}
                    url={[item.eventImageURL] || []}
                  />)}
                  keyExtractor={(item, index) => index.toString()}
                />
              </GestureHandlerRootView>
            </View>
          </View>
          <View style={{
            width: "100%",
            flex: 1,
            backgroundColor: Colors.light["palette-3"],
          }}>
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
                  active: true,
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
                  active: false,
                }
              ]}
            />
          </View>
        </View>
      </>
    );
  }
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

