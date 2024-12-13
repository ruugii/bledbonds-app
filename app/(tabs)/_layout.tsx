import { Tabs } from "expo-router";
import useScreenMode from "../../utilities/screenMode";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import Login from "../../Icons/Login";
import Register from "../../Icons/Register";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {

  const { mode } = useScreenMode()
  const [color] = useState<string>((mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"])

  const { t } = useTranslation()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: color,
        }
      }}
    >
      <Tabs.Screen
        name="login/index"
        options={{
          title: t('menu.login'),
          tabBarIcon: (Login)
        }}
      />
      <Tabs.Screen
        name="register/index"
        options={{
          title: t('menu.register'),
          tabBarIcon: (Register)
        }}
      />
    </Tabs>
  )
}