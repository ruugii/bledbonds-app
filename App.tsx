import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useAuth from './utilities/login';

export default function App() {

  const {
    isLoggedIn,
    login,
    logout
  } = useAuth();

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
