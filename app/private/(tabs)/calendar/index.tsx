import { useEffect, useState } from "react";
import getAllEvents from "../../../../api/events/getAllEvents";
import { Stack } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../../constants/Colors";
import StyledText from "../../../../components/StyledText";
import Calendar from "../../../../components/Calendar/page";
import useScreenMode from "../../../../utilities/screenMode";
import { useTranslation } from "react-i18next";

export default function CalendarPage() {

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
      setEvents(data)
    }

    fetchEventsData()
  }, [])

  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  useEffect(() => {
    if (month > 11) {
      setMonth(0);
      setYear(year + 1);
    } else if (month < 0) {
      setMonth(11);
      setYear(year - 1);
    }
  }, [month, year])

  const { mode } = useScreenMode()
  const { t } = useTranslation()

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
              {t('screens.calendar.title')}
            </StyledText>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <View style={{
                width: "10%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
                <TouchableOpacity onPress={() => setMonth(month - 1)}>
                  <StyledText title bold mayus>
                    &lt;
                  </StyledText>
                </TouchableOpacity>
              </View>
              <View style={{
                width: "80%",
                height: 400,
              }}
              >
                <Calendar
                  month={`${month + 1}`}
                  year={`${year}`}
                  events={events}
                />
              </View>
              <View style={{
                width: "10%",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
                <TouchableOpacity onPress={() => setMonth(month + 1)}>
                  <StyledText title bold mayus>
                    &gt;
                  </StyledText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          width: "100%",
          flex: 1,
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }}>
        </View>
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