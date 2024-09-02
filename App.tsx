import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useAuth from './utilities/login';
import { enableScreens } from 'react-native-screens';

export default function App() {
  enableScreens();
  const { isLoggedIn } = useAuth();

  return (
    
      isLoggedIn ? (
        <></>
      ) : (
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text>Open up App.js to start working on your app!</Text>
          <Link href="/about">Go to About</Link>
        </View>
      )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
