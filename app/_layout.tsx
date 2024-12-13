import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import Logo from "../components/Logo";
import useAuth from "../utilities/login";
import StyledText from "../components/StyledText";
import { useState } from "react";
import { enableScreens } from "react-native-screens";
import useScreenMode from "../utilities/screenMode";
import '../localization/i18n'
import { useTranslation } from "react-i18next";
import { router, Stack } from "expo-router";

interface HeaderRightProps {
  isLoggedIn: boolean;
  openConfig: boolean;
  setOpenConfig: (value: boolean) => void;
}

const HeaderTitle = () => <Logo />;

export default function Layout() {
  const { isLoggedIn, logout } = useAuth();

  const [openConfig, setOpenConfig] = useState(false);

  enableScreens();

  const { mode } = useScreenMode()

  const { t } = useTranslation();
  const handlePress = async () => {
    if (isLoggedIn) {
      await logout();
      setOpenConfig(false);
      router.replace('/');
    }
  };

  return (
    <View style={[styles.container, {
      backgroundColor: (mode === 'light') ? Colors.light["palette-1"] : Colors.dark["palette-1"],
      height: '100%',
      width: '100%',
    }]}>
      <StatusBar
        backgroundColor={mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"]}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          },
          headerTintColor: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
          headerTitle: HeaderTitle, // Use the HeaderTitle component
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />
      {openConfig && (
        <View style={{
          position: 'absolute',
          top: 56,
          right: 0,
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          borderColor: (mode === 'light') ? Colors.light["palette-4"] : Colors.dark["palette-4"],
          borderStyle: 'solid',
          borderWidth: 1
        }}>
          <View style={{
            paddingVertical: 10,
          }}>
            <TouchableOpacity onPress={handlePress}>
              <StyledText style={{ color: (mode === 'light') ? Colors.light["palette-11"] : Colors.dark["palette-11"] }} litle bold mayus>
                {isLoggedIn ? t('logout') : t('login')}
              </StyledText>
            </TouchableOpacity>
          </View>
          <View style={{
            paddingVertical: 10,
          }}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <StyledText style={{ color: (mode === 'light') ? Colors.light["palette-11"] : Colors.dark["palette-11"] }} litle bold mayus>
                {t('profile')}
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
