import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useScreenMode from "../../../utilities/screenMode";
import { Colors } from "../../../constants/Colors";
import Like from "../../../Icons/Like";
import Chat from "../../../Icons/Chat";
import Party from "../../../Icons/Party";
import CalendarIcon from "../../../Icons/CalendarIcon";
import CitasCiegas from "../../../Icons/CitasCiegas";
import menuEnabled from "../../../api/menu/menuenabled";
import Match from "./matches";
import ChatPage from "./chat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatPagePerId from "./chat/[id]";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StyledText from "../../../components/StyledText";
import LoginPage from "../../(tabs)/login";
import Logout from "../Logout";

// Stack
const Stack = createNativeStackNavigator();

function StackGroup() {
  const { mode } = useScreenMode();
  const { t } = useTranslation()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={t('chatMain')}
        component={TabGroup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={t('chatId')}
        component={ChatPagePerId}
        options={{
          headerStyle: {
            backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          }
        }}
      />
    </Stack.Navigator>
  )
}

function TabGroup() {
  const Tab = createBottomTabNavigator()
  const Drawer = createDrawerNavigator()
  const { mode } = useScreenMode()

  const [showEffects, setShowEffects] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCitasACiegas, setShowCitasACiegas] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showMatches, setShowMatches] = useState(true)

  useEffect(() => {
    const getMenu = async () => {
      const matches = await menuEnabled({ key: 'matches' });
      const events = await menuEnabled({ key: 'events' });
      const calendar = await menuEnabled({ key: 'calendar' });
      const chat = await menuEnabled({ key: 'chat' });
      const citasCiegas = await menuEnabled({ key: 'ciegas' });
      if (matches.Valor === '1') {
        setShowMatches(true);
      }
      if (events.Valor === '1') {
        setShowEffects(true);
      }
      if (calendar.Valor === '1') {
        setShowCalendar(true);
      }
      if (chat.Valor === '1') {
        setShowChat(true);
      }
      if (citasCiegas.Valor === '1') {
        setShowCitasACiegas(true);
      }
    }

    getMenu();
  }, [])

  const { t } = useTranslation()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 400,
          color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
          paddingBottom: 10,
        },
        tabBarActiveTintColor: mode === 'light' ? Colors.light["palette-10"] : Colors.dark["palette-10"],
      }}
      initialRouteName={t('matches')}
    >
      {showMatches && (
        <Tab.Screen
          name={t('matches')}
          component={Match}
          options={{
            tabBarIcon: ({ focused }) => (
              <Like black={focused} />
            )
          }}
        />
      )}
      {showChat && (
        <Tab.Screen
          name={t('chat')}
          component={ChatPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <Chat black={focused} />
            )
          }}
        />
      )}
      {showEffects && (
        <Tab.Screen
          name={t('events')}
          component={Party}
          options={{
            tabBarIcon: ({ focused }) => (
              <Party black={focused} />
            )
          }}
        />
      )}
      {showCalendar && (
        <Tab.Screen
          name={t('calendar')}
          component={CalendarIcon}
          options={{
            tabBarIcon: ({ focused }) => (
              <CalendarIcon black={focused} />
            )
          }}
        />
      )}
      {showCitasACiegas && (
        <Tab.Screen
          name={t('citasCiegas')}
          component={CitasCiegas}
          options={{
            tabBarIcon: ({ focused }) => (
              <CitasCiegas black={focused} />
            )
          }}
        />
      )}
      <Tab.Screen
        name={t('logout')}
        component={Logout}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <Logout black={focused} />
        //   )
        // }}
      />
    </Tab.Navigator>
  )
}

export default function TabsLayout() {
  return (
    <StackGroup />
  )
}