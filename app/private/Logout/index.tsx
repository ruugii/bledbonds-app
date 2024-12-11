import { useEffect } from "react";
import useAuth from "../../../utilities/login";
import { router } from "expo-router";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    router.replace('/');
    console.log('logout')
  }, [])

  return (
    <></>
  )
}