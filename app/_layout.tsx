import { router, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import Logo from "../components/Logo";
import useAuth from "../utilities/login";
import StyledText from "../components/StyledText";
import Config from "../Icons/Config";
import { useEffect, useState } from "react";

export default function Layout() {
  const { isLoggedIn, login, logout, getIsLoggedIn } = useAuth();

  const [openConfig, setOpenConfig] = useState(false);

  const handlePress = async () => {
    if (isLoggedIn) {
      await logout();
      setOpenConfig(false);
      router.replace('/');
    }
  };

  useEffect(() => {
    console.log('openConfig: ', openConfig);
  }, [openConfig])

  return (
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.light["palette-3"],
            },
            headerTintColor: Colors.light["palette-11"],
            headerTitle: () => <Logo />,
            headerLeft: () => null,
            headerRight: () => (
              isLoggedIn && (
                <TouchableOpacity onPress={() => setOpenConfig(!openConfig)}>
                  <Config />
                </TouchableOpacity>
              )
            ),
          }}
        />
        {openConfig && (
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            marginTop: 80,
            backgroundColor: Colors.light["palette-3"],
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
            <View>
              <TouchableOpacity onPress={handlePress}>
                <StyledText style={{ color: Colors.light["palette-11"] }} litle bold mayus>
                  {isLoggedIn ? 'Logout' : 'Login'}
                </StyledText>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => router.push('/profile')}>
                <StyledText style={{ color: Colors.light["palette-11"] }} litle bold mayus>
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
    backgroundColor: Colors.light["palette-1"],
  },
});
