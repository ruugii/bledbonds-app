import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import useAuth from "../../../../utilities/login";
import { useEffect, useState } from "react";
import getAllEvents from "../../../../api/events/getAllEvents";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import EventCard from "../../../../components/EventCard";
import useScreenMode from "../../../../utilities/screenMode";
import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const { isLoggedIn } = useAuth();

  const [events, setEvents] = useState<{ eventImageURL: string, event_name: string, event_date: string, event_location: string, event_description: string, id: number }[]>();

  useEffect(() => {
    const fetchEventsData = async () => {
      const data = await getAllEvents()
      setEvents(data)
    }

    fetchEventsData()
  }, [])

  const { mode } = useScreenMode()
  const { t } = useTranslation()

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
        <View style={[styles.container, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <View style={[styles.box, styles.box2, {
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          },]}>
            <View style={[styles.mailPage, {
              backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"]
            }]}>
              <GestureHandlerRootView>
                <FlatList
                  data={events}
                  numColumns={1}
                  renderItem={({ item }) => (
                    <EventCard
                      name={item.event_name || t('screens.events.noName')}
                      description={item.event_description || t('screens.events.noDescription')}
                      location={item.event_location || t('screens.events.noLocation')}
                      url={[item.eventImageURL]}
                      id={item.id}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </GestureHandlerRootView>
            </View>
          </View>
          <View style={{
            width: "100%",
            flex: 1,
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          }}>
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

