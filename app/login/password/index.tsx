import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StyledText from "../../../components/StyledText";
import Btn from "../../../ux/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import loginAPI from "../../../api/login/loginWithPassword";
import { Colors } from "../../../constants/Colors";
import useAuth from "../../../utilities/login";
import { Link, Stack, useRouter } from "expo-router";
import Menu from "../../../components/Menu/Menu";
import useScreenMode from "../../../utilities/screenMode";
import EyeOpen from "../../../Icons/EyeOpen";
import EyeClose from "../../../Icons/EyeClose";

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

async function checkIsPendingCode(setHasCode: React.Dispatch<React.SetStateAction<boolean>>) {
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
}

function EmailInput({ email, setEmail, emailError, mode }: { readonly email: string, readonly setEmail: React.Dispatch<React.SetStateAction<string>>, readonly emailError: boolean, readonly mode: string }) {
  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>
        Email
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
        placeholder="Email"
        autoComplete="email"
      />
    </View>
  );
}

function PhoneInput({ phone, setPhone, phoneError, mode }: { readonly phone: string, readonly setPhone: React.Dispatch<React.SetStateAction<string>>, readonly phoneError: boolean, readonly mode: string }) {
  return (
    <View style={{ marginTop: 10 }}>
      <StyledText litle bold mayus left>
        Phone - sin prefijo
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
        placeholder="Phone"
        autoComplete="tel"
        keyboardType="numeric"
      />
    </View>
  );
}

function CodeInput({ code, setCode, codeError, mode, showPassword, setShowPassword }: { readonly code: string, readonly setCode: React.Dispatch<React.SetStateAction<string>>, readonly codeError: boolean, readonly mode: string, readonly showPassword: boolean, readonly setShowPassword: React.Dispatch<React.SetStateAction<boolean>> }) {
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
        {showPassword ? <EyeOpen /> : <EyeClose /> }
      </TouchableOpacity>
      <StyledText litle left bold mayus>
        Password
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          codeError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        onChangeText={setCode}
        value={code}
        placeholder="Password"
        secureTextEntry={showPassword}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
      />
    </View>
  );
}

export default function LoginPage() {
  const { email, setEmail, emailError, phone, setPhone, phoneError, code, setCode, codeError } = useValidation();
  const { isLoggedIn, login } = useAuth();
  const [hasCode, setHasCode] = useState(false);
  const router = useRouter();
  const { mode } = useScreenMode();
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    checkIsPendingCode(setHasCode);
  }, []);

  const handleLogin = async () => {
    try {
      const user = { email, phone, password: code };
      const resp = await loginAPI(user);
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

  if (isLoggedIn) {
    return null;
  }

  const generateMenu = () => (
    <Menu
      options={[
        { id: 1, text: 'CODE', selected: true, url: '/login/code', active: false },
        { id: 2, text: 'PASSWORD', selected: false, url: '/login/password', active: true },
      ]}
    />
  )

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: generateMenu,
          headerRight: () => null,
        }}
      />
      <View style={[styles.container, { backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"] }]}>
        <View style={[styles.box, styles.box2, { marginHorizontal: 20, backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"] }]}>
          <View style={[styles.mailPage, { backgroundColor: mode === 'light' ? Colors.light["palette-3"] : Colors.dark["palette-3"] }]}>
            <View>
              <EmailInput email={email} setEmail={setEmail} emailError={emailError} mode={mode} />
              <PhoneInput phone={phone} setPhone={setPhone} phoneError={phoneError} mode={mode} />
              {!hasCode && (
                <Btn title="Continuar" clickable onPress={() => setHasCode(true)} disabled={emailError || phoneError} />
              )}
              {hasCode && (
                <>
                  <CodeInput code={code} setCode={setCode} codeError={codeError} mode={mode} showPassword={showPassword} setShowPassword={setShowPassword} />
                  <Btn title="Continuar" clickable onPress={handleLogin} disabled={codeError} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
  },
  box2: {
    flex: 10,
    height: '100%',
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
