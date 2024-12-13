import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import StyledText from "../../../components/StyledText";
import Btn from "../../../ux/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import loginByCode from "../../../api/login/loginCode";
import { Colors } from "../../../constants/Colors";
import useAuth from "../../../utilities/login";
import { Link, router, Tabs } from "expo-router";
import useScreenMode from "../../../utilities/screenMode";
import EyeOpen from "../../../Icons/EyeOpen";
import EyeClose from "../../../Icons/EyeClose";
import loginAPI from "../../../api/login/loginWithPassword";
import { useTranslation } from "react-i18next";

function useValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    setCodeError(code.length < 6);
  }, [code]);

  useEffect(() => {
    setEmailError(!isValidEmail(email));
  }, [email]);

  useEffect(() => {
    setPhoneError(phone.length !== 9);
  }, [phone]);

  function isValidEmail(email: string) {
    const [localPart, domain] = email.split('@');
    return (
      email.length > 0 &&
      localPart &&
      domain &&
      domain.includes('.') &&
      domain.split('.').length >= 2
    );
  }

  return { email, setEmail, emailError, phone, setPhone, phoneError, code, setCode, codeError };
}

function EmailInput({ email, setEmail, emailError, mode }: { readonly email: string, readonly setEmail: React.Dispatch<React.SetStateAction<string>>, readonly emailError: boolean, readonly mode: string }) {

  const { t } = useTranslation();

  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>
        {t('screens.login.text.email')}
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          emailError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
        onChangeText={setEmail}
        value={email}
        placeholder={t('screens.login.text.email')}
        autoComplete="email"
      />
    </View>
  );
}

function PhoneInput({ phone, setPhone, phoneError, mode }: { readonly phone: string, readonly setPhone: React.Dispatch<React.SetStateAction<string>>, readonly phoneError: boolean, readonly mode: string }) {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: 10 }}>
      <StyledText litle bold mayus left>
        {t('screens.login.text.phone')}
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          phoneError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
        onChangeText={setPhone}
        value={phone}
        placeholder={t('screens.login.text.phone')}
        autoComplete="tel"
        keyboardType="numeric"
      />
    </View>
  );
}

function CodeInput({ code, setCode, codeError, mode, showPassword, setShowPassword }: { readonly code: string, readonly setCode: React.Dispatch<React.SetStateAction<string>>, readonly codeError: boolean, readonly mode: string, readonly showPassword: boolean, readonly setShowPassword: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { t } = useTranslation();

  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity onPress={() => {
        setShowPassword(!showPassword)
      }} style={{
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        margin: 0,
        marginTop: 12,
        zIndex: 1000
      }} >
        {showPassword ? <EyeOpen /> : <EyeClose />}
      </TouchableOpacity>
      <StyledText litle left bold mayus>
        {t('screens.login.text.password')}
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          codeError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        onChangeText={setCode}
        value={code}
        placeholder={t('screens.login.text.password')}
        secureTextEntry={showPassword}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
      />
    </View>
  );
}

export default function LoginPage() {

  const { t } = useTranslation();

  const { email, setEmail, emailError, phone, setPhone, phoneError, code, setCode, codeError } = useValidation();
  const [showPassword, setShowPassword] = useState(true);

  const [hasCode, setHasCode] = useState(false);
  const { isLoggedIn, login } = useAuth();
  const [type, setType] = useState<'code' | 'password'>('code');


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

  const { mode } = useScreenMode()



  const handleLogin = async () => {
    try {
      const user = { email, phone, password: code };
      const resp = await loginAPI(user);
      console.log(resp);
      if (resp.token) {
        await AsyncStorage.setItem('token', resp.token ?? '');
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('idUser', `${resp.id}`);
        await login(true);
        if (resp.perfilCompleto) {
          router.replace('/');  // Redirect to root after login
        } else {
          router.replace('/complete-profile');  // Redirect to complete profile after login
        }
      }
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };


  return (
    !isLoggedIn && (
      <>
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          marginHorizontal: 20,
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <TouchableOpacity onPress={() => setType(type === 'code' ? 'password' : 'code')} style={{
            zIndex: 1000,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <StyledText litle underline>
              {type === 'code' ? (
                t('screens.login.changeText.login_with_password')
              ) : (
                t('screens.login.changeText.login_with_code')
              )}
            </StyledText>
          </TouchableOpacity>
          <View style={[styles.mailPage, {
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"]
          }]}>
            {type === 'code' ? (
              <View>
                <EmailInput email={email} setEmail={setEmail} emailError={emailError} mode={mode} />
                {!hasCode && (
                  <Btn
                    title={t('screens.login.button.login')}
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
                      placeholder={t('screens.login.text.code')}
                      keyboardType="numeric"
                      placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
                    />
                    <Btn
                      title={t('screens.login.button.login_with_code')}
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
            ) : (
              <View>
                <EmailInput email={email} setEmail={setEmail} emailError={emailError} mode={mode} />
                <PhoneInput phone={phone} setPhone={setPhone} phoneError={phoneError} mode={mode} />
                {!hasCode && (
                  <Btn title={t('screens.login.button.login')} clickable onPress={() => setHasCode(true)} disabled={emailError || phoneError} />
                )}
                {hasCode && (
                  <>
                    <CodeInput code={code} setCode={setCode} codeError={codeError} mode={mode} showPassword={showPassword} setShowPassword={setShowPassword} />
                    <Btn title={t('screens.login.button.login_with_password')} clickable onPress={handleLogin} disabled={codeError} />
                  </>
                )}
              </View>
            )}
            <Link href='/register' style={{
              textAlign: 'right',
              marginBottom: 15,
            }}>
              <StyledText litle underline right>
                {t('screens.login.text.no_acount')}
              </StyledText>
            </Link>
          </View>
        </View>
      </View>
      <Tabs></Tabs>
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
