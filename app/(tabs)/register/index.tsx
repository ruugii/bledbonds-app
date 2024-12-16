import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import StyledText from "../../../components/StyledText";
import Btn from "../../../ux/Btn";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "../../../constants/Colors";
import { Link, router, Stack } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import getGenderAPI from "../../../api/gender/getGenders";
import registerAPI from "../../../api/register";
import useAuth from "../../../utilities/login";
import useScreenMode from "../../../utilities/screenMode";
import EyeOpen from "../../../Icons/EyeOpen";
import EyeClose from "../../../Icons/EyeClose";
import UpArrowIcon from "../../../Icons/UpArrow";
import DownArrowIcon from "../../../Icons/DownArrow";
import DateTimePicker from 'react-native-ui-datepicker';
import * as Location from 'expo-location';
import { useTranslation } from "react-i18next";

interface DatePickerProps {
  setDay: (int: number) => void;
  setMonth: (int: number) => void;
  setYear: (int: number) => void;
  dayOptions: number[];
  monthOptions: { id: number, name: string }[];
  yearOptions: number[];
}

interface GenderInterface {
  id: number;
  genre_name: string;
}

function EmailInput({ email, setEmail, emailError, mode }: { readonly email: string, readonly setEmail: React.Dispatch<React.SetStateAction<string>>, readonly emailError: boolean, readonly mode: string }) {

  const { t } = useTranslation();

  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>
        {t('screens.register.text.email')}
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
        placeholder={t('screens.register.text.email')}
        autoComplete="email"
      />
    </View>
  );
}

function PhoneInput({ phone, setPhone, phoneError, mode }: { readonly phone: string, readonly setPhone: React.Dispatch<React.SetStateAction<string>>, readonly phoneError: boolean, readonly mode: string }) {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>
        {t('screens.register.text.phone')}
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
        placeholder={t('screens.register.text.phone')}
        autoComplete="tel"
        keyboardType="numeric"
      />
    </View>
  );
}

function NameInput({ name, setName, nameError, mode }: { readonly name: string, readonly setName: React.Dispatch<React.SetStateAction<string>>, readonly nameError: boolean, readonly mode: string }) {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>
        {t('screens.register.text.name')}
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          nameError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
        onChangeText={setName}
        value={name}
        placeholder={t('screens.register.text.name')}
        autoComplete="name"
      />
    </View>
  );
}

function FechaInput({ birthdate, setBirthdate, mode, showDatePicker, setShowDatePicker, isMayorEdad }: { readonly birthdate: Date, readonly setBirthdate: React.Dispatch<React.SetStateAction<Date>>, readonly mode: string, readonly showDatePicker: boolean, readonly setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>, isMayorEdad: boolean }) {
  const { t } = useTranslation();
  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>
        {t('screens.register.text.birthdate')}
      </StyledText>
      <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}
        style={[styles.input, {
          borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
        }, !isMayorEdad && { borderColor: 'red' }]}>
        <StyledText litle bold mayus left>
          {birthdate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? birthdate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Fecha de nacimiento'}
        </StyledText>
      </TouchableOpacity>
    </View>
  );
}

function CodeInput({ code, setCode, codeError, mode, showPassword, setShowPassword, showDatePicker }: { readonly code: string, readonly setCode: React.Dispatch<React.SetStateAction<string>>, readonly codeError: boolean, readonly mode: string, readonly showPassword: boolean, readonly setShowPassword: React.Dispatch<React.SetStateAction<boolean>>, showDatePicker?: boolean }) {

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
        {showDatePicker === false && (
          showPassword ? <EyeOpen /> : <EyeClose />
        )}
      </TouchableOpacity>
      <StyledText xsmall left bold mayus>
        {t('screens.register.text.password')}
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          codeError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        onChangeText={setCode}
        value={code}
        placeholder={t('screens.register.text.password')}
        secureTextEntry={showPassword}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
      />
    </View>
  );
}

function CodeRepeatInput({ code, setCode, codeError, mode, showPassword, setShowPassword, showDatePicker }: { readonly code: string, readonly setCode: React.Dispatch<React.SetStateAction<string>>, readonly codeError: boolean, readonly mode: string, readonly showPassword: boolean, readonly setShowPassword: React.Dispatch<React.SetStateAction<boolean>>, showDatePicker?: boolean }) {

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
        {showDatePicker === false && (
          showPassword ? <EyeOpen /> : <EyeClose />
        )}
      </TouchableOpacity>
      <StyledText xsmall left bold mayus>
        {t('screens.register.text.repeat_password')}
      </StyledText>
      <TextInput
        style={[
          styles.imput,
          codeError ? { borderColor: 'red' } : { borderColor: mode === 'light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] },
          { color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] },
        ]}
        onChangeText={setCode}
        value={code}
        placeholder={t('screens.register.text.repeat_password')}
        secureTextEntry={showPassword}
        placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
      />
    </View>
  );
}

function SelectGenderDropdown({ setGender, mode, genderList, genderError }: { setGender: any, mode: string, genderList: GenderInterface[], genderError: boolean }) {
  const { t } = useTranslation();

  return (
    <View style={{ marginTop: 10 }}>
      <StyledText xsmall bold mayus left>{t('screens.register.text.gender')}</StyledText>
      <SelectList
        setSelected={setGender}
        data={genderList?.map((v) => v.genre_name)}
        boxStyles={{ borderColor: genderError ? 'red' : mode === 'light' ? Colors.light["palette-1"] : Colors.dark["palette-1"] }}
        inputStyles={{ color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }}
        searchicon={<></>}
        closeicon={<UpArrowIcon />}
        dropdownTextStyles={{ color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }}
        dropdownStyles={{ borderColor: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"] }}
        arrowicon={<DownArrowIcon />}
        placeholder={t('screens.register.text.gender')}
      />
    </View>
  )
}

export default function RegisterPage() {
  const [isMayorEdad, setIsMayorEdad] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(true);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState(true);
  const [hasCode] = useState(false);
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState(true);
  const [genderList, setGenderList] = useState<GenderInterface[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const { login } = useAuth();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('ALERT: Location permissions are not granted');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    }

    getLocation();
  }, [])

  useEffect(() => {
    const fetchGender = async () => {
      const data = await getGenderAPI();
      setGenderList(data);
    }
    fetchGender();
  }, [])

  useEffect(() => {
    setGenderError(gender === '');
  }, [gender])

  useEffect(() => {
    setEmailError(!(email.includes('@') && email.split('@')[1].includes('.')));
  }, [email]);

  useEffect(() => {
    setPhoneError(phone.length !== 9);
  }, [phone]);

  useEffect(() => {
    setNameError(name === '');
  }, [name]);

  useEffect(() => {
    setPasswordError(password !== repeatPassword || password === '');
  }, [password, repeatPassword]);

  const { mode } = useScreenMode()

  const headerTitle = () => <StyledText litle full center bold mayus>REGISTRO</StyledText>

  const [showPassword, setShowPassword] = useState(true)
  const [showRepeatPassword, setShowRepeatPassword] = useState(true)
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    // calcular si soy mayor de edad
    if (birthdate) {
      const currentDate = new Date();
      const monthDifference = currentDate.getMonth() - birthdate.getMonth();
      let age = currentDate.getFullYear() - birthdate.getFullYear();
      if (monthDifference < 0) {
        age--;
      } else if (monthDifference === 0) {
        const dayDifference = currentDate.getDate() - birthdate.getDate();
        if (dayDifference < 0) {
          age--;
        }
      } else if (age < 18 || (age === 18 && monthDifference >= 0)) {
        setIsMayorEdad(false)
      } else {
        setIsMayorEdad(true)
      }
    }
  }, [birthdate])

  const onChangeDate = useCallback(
    (params: { date: string }) => {
      const selectedDate = new Date(params.date);

      // Crear una nueva fecha manualmente con los componentes de año, mes y día, evitando zonas horarias
      const correctedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        12, 0, 0  // Establecer hora manualmente para evitar que cambie el día
      );
      // Esto elimina cualquier problema de zona horaria
      setBirthdate(correctedDate);
      setShowDatePicker(false);
    }, []
  )

  const { t } = useTranslation();

  return (
    <>
      {showDatePicker && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1000,
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
            width: '90%',
            borderRadius: 10,
            padding: 20,
          }}>
            <DateTimePicker
              mode="single"
              date={new Date()}
              onChange={onChangeDate}
              maxDate={new Date()}
              locale={'es-ES'}
              firstDayOfWeek={1}
              selectedItemColor={(mode === 'light') ? Colors.light["palette-1"] : Colors.dark["palette-1"]}
              selectedTextStyle={(mode === 'light') ? { color: Colors.light["palette-11"] } : { color: Colors.dark["palette-11"] }}
            />
          </View>
        </View>
      )}
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
              <EmailInput
                email={email}
                setEmail={setEmail}
                emailError={emailError}
                mode={mode}
              />
              <PhoneInput
                phone={phone}
                setPhone={setPhone}
                phoneError={phoneError}
                mode={mode}
              />
              <NameInput
                name={name}
                setName={setName}
                nameError={nameError}
                mode={mode}
              />
              <FechaInput
                birthdate={birthdate}
                setBirthdate={setBirthdate}
                mode={mode}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                isMayorEdad={isMayorEdad}
              />
              <CodeInput
                code={password}
                setCode={setPassword}
                codeError={passwordError}
                mode={mode}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showDatePicker={showDatePicker}
              />
              <CodeRepeatInput
                code={repeatPassword}
                setCode={setRepeatPassword}
                codeError={(password === repeatPassword && password.length > 0) ? false : true}
                mode={mode}
                showPassword={showRepeatPassword}
                setShowPassword={setShowRepeatPassword}
                showDatePicker={showDatePicker}
              />
              <SelectGenderDropdown
                setGender={setGender}
                mode={mode}
                genderList={genderList}
                genderError={genderError}
              />
              {!hasCode && (
                <Btn
                  title={t('screens.register.button.register')}
                  clickable
                  onPress={() => {
                    const user = {
                      email: email.includes('\n') ? email.split('\n')[0] : email,
                      phone: phone,
                      password: password,
                      name: name,
                      birthDate: birthdate.toISOString().split('T')[0],
                      genre: gender,
                      lat: latitude,
                      lon: longitude,
                    }
                    const register = async () => {
                      const data = await registerAPI(user)
                      if (data) {
                        router.replace('/');
                      }
                    }
                    register();
                  }}
                  disabled={emailError || phoneError || nameError || passwordError || genderError || !isMayorEdad}
                />
              )}
            </View>
            <Link href='/login' style={{ textAlign: 'right', marginBottom: 15 }}>
              <StyledText litle underline right full>{t('screens.register.text.no_acount')}</StyledText>
            </Link>
          </View>
        </View>
      </View>
      {/* <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <ScrollView>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Fecha de nacimiento</StyledText>
              <TouchableOpacity onPress={() => setShowDatePicker(!showDatePicker)}
                style={[styles.input, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                }, !isMayorEdad && { borderColor: 'red' }]}>
                <StyledText litle bold mayus left>
                  {birthdate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? birthdate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Fecha de nacimiento'}
                </StyledText>
              </TouchableOpacity>
            </View>
            
            <Link href='/login' style={{ textAlign: 'right', marginBottom: 15 }}>
              <StyledText litle underline right full>Ya tienes una cuenta? Accede a continuacion</StyledText>
            </Link>
          </ScrollView>
        </View>
      </View> */}
    </>
  )
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
  mailPage: {
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  formGroup: {
    marginTop: 10,
  },
  linkStyle: {
    textDecorationLine: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  box: {
    flex: 1,
  },
  box2: {
    flex: 10,
    height: '100%',
  },
});
