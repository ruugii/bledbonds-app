import { router, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import Logo from "../components/Logo";
import useAuth from "../utilities/login";
import StyledText from "../components/StyledText";
import Config from "../Icons/Config";
import { useEffect, useState } from "react";
import { enableScreens } from "react-native-screens";
import useScreenMode from "../utilities/screenMode";

interface HeaderRightProps {
  isLoggedIn: boolean;
  openConfig: boolean;
  setOpenConfig: (value: boolean) => void;
}

const HeaderRight = ({ isLoggedIn, openConfig, setOpenConfig }: HeaderRightProps) => (
  isLoggedIn && (
    <TouchableOpacity onPress={() => setOpenConfig(!openConfig)}>
      <Config />
    </TouchableOpacity>
  )
);

const HeaderTitle = () => <Logo />;

export default function Layout() {
  const { isLoggedIn, logout } = useAuth();

  const [openConfig, setOpenConfig] = useState(false);

  enableScreens();

  const { mode } = useScreenMode()

  const handlePress = async () => {
    if (isLoggedIn) {
      await logout();
      setOpenConfig(false);
      router.replace('/');
    }
  };

  const getHeaderRight = () => (
    <HeaderRight
      isLoggedIn={isLoggedIn}
      openConfig={openConfig}
      setOpenConfig={setOpenConfig}
    />
  )

  return (
    <View style={[styles.container, {
      backgroundColor: (mode === 'light') ? Colors.light["palette-1"] : Colors.dark["palette-1"]
    }]}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          },
          headerTintColor: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
          headerTitle: HeaderTitle, // Use the HeaderTitle component
          headerLeft: () => null,
          headerRight: getHeaderRight,
        }}
      />
      {openConfig && (
        <View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginTop: 80,
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
          <View style={{
            paddingVertical: 10,
          }}>
            <TouchableOpacity onPress={handlePress}>
              <StyledText style={{ color: (mode === 'light') ? Colors.light["palette-11"] : Colors.dark["palette-11"] }} litle bold mayus>
                {isLoggedIn ? 'Logout' : 'Login'}
              </StyledText>
            </TouchableOpacity>
          </View>
          <View style={{
            paddingVertical: 10,
          }}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <StyledText style={{ color: (mode === 'light') ? Colors.light["palette-11"] : Colors.dark["palette-11"] }} litle bold mayus>
                Profile
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
