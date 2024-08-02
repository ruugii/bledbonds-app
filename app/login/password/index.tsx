import { StyleSheet, TextInput, View } from "react-native";
import StyledText from "../../../components/StyledText";
import Btn from "../../../ux/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import loginByCode from "../../../api/login/loginCode";
import { Colors } from "../../../constants/Colors";
import useAuth from "../../../utilities/login";
import { Link, Navigator, Stack } from "expo-router";
import Menu from "../../../components/Menu/Menu";
import loginAPI from "../../../api/login/loginWithPassword";
import { Route } from "expo-router/build/Route";

// Import the useRouter hook from expo-router
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const [isPendingCode, setIsPendingCode] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [hasCode, setHasCode] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();  // Use useRouter hook here

  useEffect(() => {
    setCodeError(code.length < 6);
  }, [code]);

  useEffect(() => {
    setEmailError(
      email.length === 0 ||
      !email.includes('@') ||
      email.split('@').length !== 2 ||
      !email.split('@')[1].includes('.') ||
      email.split('@')[1].split('.').length < 2
    );
  }, [email]);

  useEffect(() => {
    setPhoneError(phone.length !== 9);
  }, [phone]);

  useEffect(() => {
    checkIsPendingCode();
  }, []);

  const checkIsPendingCode = async () => {
    try {
      const value = await AsyncStorage.getItem('isPendingCode');
      if (value !== null) {
        const isPendingCode = JSON.parse(value);
        if (isPendingCode.isPendingCode && isPendingCode.caducity > new Date().getTime()) {
          setIsPendingCode(true);
          setHasCode(true);
        }
      }
    } catch (error) {
      console.error('Error retrieving pending code status: ', error);
    }
  };

  if (isLoggedIn) {
    return <></>;
  } else {
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: () => <Menu options={[
              {
                id: 1,
                text: 'CODE',
                selected: true,
                url: '/login/code',
                active: false,
              },
              {
                id: 2,
                text: 'PASSWORD',
                selected: false,
                url: '/login/password',
                active: true,
              }
            ]} />,
            headerRight: () => <></>,
          }}
        />
        <View style={styles.container}>
          <View style={[styles.box, styles.box2, { marginHorizontal: 20 }]}>
            <View style={styles.mailPage}>
              <View>
                <View style={{ marginTop: 10 }}>
                  <StyledText litle bold mayus left>
                    Email
                  </StyledText>
                  <TextInput
                    style={[styles.imput, emailError ? { borderColor: 'red' } : { borderColor: Colors.light["palette-6"] }]}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    autoComplete="email"
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <StyledText litle bold mayus left>
                    Phone - sin prefijo
                  </StyledText>
                  <TextInput
                    style={[styles.imput, phoneError ? { borderColor: 'red' } : { borderColor: Colors.light["palette-6"] }]}
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="Phone"
                    autoComplete="tel"
                    keyboardType="numeric"
                  />
                </View>
                {!hasCode && (
                  <Btn
                    title="Continuar"
                    clickable
                    onPress={() => setHasCode(true)}
                    disabled={emailError || phoneError}
                  />
                )}
                {hasCode && (
                  <>
                    <View style={{ marginTop: 10 }}>
                      <StyledText litle left bold mayus>
                        Password
                      </StyledText>
                      <TextInput
                        style={[styles.imput, styles.imputCode, codeError ? { borderColor: 'red' } : { borderColor: Colors.light["palette-6"] }]}
                        onChangeText={setCode}
                        value={code}
                        placeholder="Password"
                        secureTextEntry
                      />
                    </View>
                    <Btn
                      title="Continuar"
                      clickable
                      onPress={async () => {
                        try {
                          const user = { email, phone, password: code };
                          const resp = await loginAPI(user);
                          if (resp.token) {
                            await AsyncStorage.setItem('token', resp.token);
                            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                            await AsyncStorage.setItem('idUser', `${resp.id}`);
                            await login(true);
                            router.replace('/');  // Redirect to root after login
                          }
                        } catch (error) {
                          console.error('Error logging in: ', error);
                        }
                      }}
                      disabled={codeError}
                    />
                  </>
                )}
              </View>
              <Link href='/register' style={{ textAlign: 'right', marginBottom: 15 }}>
                <StyledText litle underline right>
                  No tienes cuenta? Regístrate gratis aquí
                </StyledText>
              </Link>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.light["palette-3"],
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  imput: {
    borderWidth: 1,
    borderColor: Colors.light["palette-1"],
    padding: 10,
    borderRadius: 10,
  },
  imputCode: {
    marginTop: 10,
  },
  linkStyle: {
    textDecorationLine: 'none', // Elimina la decoración por defecto
    display: 'flex', // Asegura que el Link use flex
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    width: '100%', // Ancho del 100%
    marginTop: 10, // Margen superior de 10
  },
  mailPage: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.light["palette-3"]
  },
  box: {
    flex: 1,
  },
  box1: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 10,
    height: '100%',
    backgroundColor: Colors.light["palette-3"],
  },
  box3: {
    flex: 0.5,
  },
  button: {
    borderRadius: 15,
    backgroundColor: Colors.light['palette-6'],
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
});

