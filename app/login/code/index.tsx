import { StyleSheet, TextInput, View } from "react-native";
import StyledText from "../../../components/StyledText";
import Btn from "../../../ux/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import loginByCode from "../../../api/login/loginCode";
import { Colors } from "../../../constants/Colors";
import useAuth from "../../../utilities/login";
import { Link, router, Stack } from "expo-router";
import Menu from "../../../components/Menu/Menu";
import useScreenMode from "../../../utilities/screenMode";

const validateEmail = (email: string) => {
  return (
    email.length === 0 ||
    !email.includes('@') ||
    email.split('@').length !== 2 ||
    !email.split('@')[1].includes('.') ||
    email.split('@')[1].split('.').length < 2
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [hasCode, setHasCode] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    setCodeError(code.length !== 6);
  }, [code]);

  useEffect(() => {
    checkIsPendingCode();
  }, []);

  const checkIsPendingCode = async () => {
    try {
      const value = await AsyncStorage.getItem('isPendingCode');
      if (value !== null) {
        const isPendingCode = JSON.parse(value);
        if (isPendingCode.isPendingCode && isPendingCode.caducity > new Date().getTime()) {
          setHasCode(true);
        }
      }
    } catch (error) {
      console.error('Error retrieving pending code status: ', error);
    }
  };

  useEffect(() => {
    setEmailError(validateEmail(email));
  }, [email]);

  const { mode } = useScreenMode()

  const generateMenu = () => (
    <Menu options={[
      {
        id: 1,
        text: 'CODE',
        selected: true,
        url: '/login/code',
        active: true,
      },
      {
        id: 2,
        text: 'PASSWORD',
        selected: false,
        url: '/login/password',
        active: false,
      }
    ]} />
  )

  return (
    !isLoggedIn && (
      <>
        <Stack.Screen
          options={{
            headerTitle: generateMenu,
            headerRight: () => null,
            headerLeft: () => null,
          }}
        />
        <View style={[styles.container, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <View style={[styles.box, styles.box2, {
            marginHorizontal: 20,
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          }]}>
            <View style={[styles.mailPage, {
              backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"]
            }]}>
              <View>
                <StyledText subtitle bold mayus>
                  Nos das tu email?
                </StyledText>
                <TextInput
                  style={[styles.imput, emailError ? { borderColor: 'red' } : { borderColor: (mode === 'light') ? Colors.light["palette-6"] : Colors.dark["palette-6"] }, { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }]}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  autoComplete="email"
                  placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
                />
                {!hasCode && (
                  <Btn
                    title="Continuar"
                    clickable
                    onPress={() => {
                      const login = async () => {
                        try {
                          const data = await loginByCode({ email });
                          if (data) {
                            await AsyncStorage.setItem('isPendingCode', JSON.stringify({
                              isPendingCode: true,
                              caducity: new Date().getTime() + 600000,
                            }));
                            setHasCode(true);
                          }
                        } catch (error) {
                          console.error('Error logging in: ', error);
                        }
                      }
                      login();
                    }}
                    disabled={emailError}
                  />
                )}
                {hasCode && (
                  <>
                    <TextInput
                      style={[styles.imput, styles.imputCode, codeError ? { borderColor: 'red' } : { borderColor: (mode === 'light') ? Colors.light["palette-6"] : Colors.dark["palette-6"] }, { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }]}
                      onChangeText={setCode}
                      value={code}
                      placeholder="Código de verificación"
                      keyboardType="numeric"
                      placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
                    />
                    <Btn
                      title="Continuar"
                      clickable
                      onPress={() => {
                        const login_ = async () => {
                          try {
                            const data = await loginByCode({ email, code });
                            if (data) {
                              await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
                              await AsyncStorage.setItem('token', data.token);
                              await login(true);
                              await AsyncStorage.removeItem('isPendingCode');
                              router.replace('/');
                            }
                          } catch (error) {
                            console.error('Error logging in: ', error);
                            setHasCode(false);
                          }
                        }
                        login_();
                      }}
                      disabled={codeError}
                    />
                  </>
                )}
              </View>
              <Link href='/register' style={{
                textAlign: 'right',
                marginBottom: 15,
              }}>
                <StyledText litle underline right>
                  No tienes cuenta? Regístrate gratis aquí
                </StyledText>
              </Link>
            </View>
          </View>
        </View>
      </>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  imputCode: {
    marginTop: 10,
  },
  mailPage: {
    flex: 1,
    justifyContent: 'space-between'
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
  },
  box3: {
    flex: 0.5,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
});
