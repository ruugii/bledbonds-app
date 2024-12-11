import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useAuth from './utilities/login';
import { enableScreens } from 'react-native-screens';
import useScreenMode from './utilities/screenMode';
import { Colors } from './constants/Colors';

export default function App() {
  enableScreens();
  const { isLoggedIn } = useAuth();
  const { mode } = useScreenMode()
  return (
    isLoggedIn ? (
      <View style={[styles.container, {
        backgroundColor: (mode === 'dark') ? Colors.dark['palette-3'] : Colors.light['palette-3'],
      }]}>
      </View>
    ) : (
      <View style={[styles.container, {
        backgroundColor: (mode === 'dark') ? Colors.dark['palette-3'] : Colors.light['palette-3'],
      }]}>
        <StatusBar style="auto" />
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
