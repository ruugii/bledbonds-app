import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== null) {
        setIsLoggedIn(JSON.parse(value));
      }
    } catch (error) {
      console.error('Error retrieving authentication status: ', error);
    }
  };

  const login = async (value:boolean) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(value));
      setIsLoggedIn(value);
    } catch (error) {
      console.error('Error setting authentication status: ', error);
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error removing authentication status: ', error);
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const getIsLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Error retrieving authentication status: ', error);
    }
  }

  return { isLoggedIn, login, logout, getIsLoggedIn };
}

export default useAuth;
