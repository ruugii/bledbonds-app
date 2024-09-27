import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import StyledText from "../../components/StyledText";
import Btn from "../../ux/Btn";
import { useCallback, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Link, router, Stack } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import getGenderAPI from "../../api/gender/getGenders";
import registerAPI from "../../api/register";
import useAuth from "../../utilities/login";
import useScreenMode from "../../utilities/screenMode";
import EyeOpen from "../../Icons/EyeOpen";
import EyeClose from "../../Icons/EyeClose";
import UpArrowIcon from "../../Icons/UpArrow";
import DownArrowIcon from "../../Icons/DownArrow";
import DateTimePicker from 'react-native-ui-datepicker';
import * as Location from 'expo-location';


const getID = (id: string) => {
  switch (id) {
    case 'Enero': return 1;
    case 'Febrero': return 2;
    case 'Marzo': return 3;
    case 'Abril': return 4;
    case 'Mayo': return 5;
    case 'Junio': return 6;
    case 'Julio': return 7;
    case 'Agosto': return 8;
    case 'Septiembre': return 9;
    case 'Octubre': return 10;
    case 'Noviembre': return 11;
    case 'Diciembre': return 12;
    default: return 0;
  }
}

interface DatePickerProps {
  setDay: (int: number) => void;
  setMonth: (int: number) => void;
  setYear: (int: number) => void;
  dayOptions: number[];
  monthOptions: { id: number, name: string }[];
  yearOptions: number[];
}

const DatePicker = ({ setDay, setMonth, setYear, dayOptions, monthOptions, yearOptions }: DatePickerProps) => (
  <View style={{ flexDirection: 'row', gap: 5, width: '100%' }}>
    <View style={{ width: '30%' }}>
      <StyledText xsmall bold mayus left>Día</StyledText>
      <SelectList
        setSelected={setDay}
        data={dayOptions}
      />
    </View>
    <View style={{ width: '30%' }}>
      <StyledText xsmall bold mayus left>Mes</StyledText>
      <SelectList setSelected={setMonth} data={monthOptions.map((v) => v.name)} />
    </View>
    <View style={{ width: '30%' }}>
      <StyledText xsmall bold mayus left>Año</StyledText>
      <SelectList setSelected={setYear} data={yearOptions} />
    </View>
  </View>
);

interface GenderInterface {
  id: number;
  genre_name: string;
}

export default function LoginPage() {
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
      <Stack.Screen
        options={{
          headerLeft: () => headerTitle(),
          headerRight: () => null,
        }}
      />
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <ScrollView>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Email</StyledText>
              <TextInput
                style={[styles.input, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                  color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
                }, emailError && { borderColor: 'red' }]}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoComplete="email"
                placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Phone - sin prefijo</StyledText>
              <TextInput
                style={[styles.input, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                  color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
                }, phoneError && { borderColor: 'red' }]}
                onChangeText={setPhone}
                value={phone}
                placeholder="Phone"
                autoComplete="tel"
                keyboardType="numeric"
                placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Nombre</StyledText>
              <TextInput
                style={[styles.input, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                  color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
                }, nameError && { borderColor: 'red' }]}
                onChangeText={setName}
                value={name}
                placeholder="Nombre"
                autoComplete="name"
                placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
              />
            </View>
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
            <View style={styles.formGroup}>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{
                position: 'absolute',
                right: 10,
                height: '100%',
                justifyContent: 'center',
                margin: 0,
                marginTop: 12,
                zIndex: 1000,
              }}>
                {showPassword ? <EyeOpen /> : <EyeClose />}
              </TouchableOpacity>
              <StyledText litle bold mayus left>Password</StyledText>
              <TextInput
                style={[styles.input, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                  color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
                }, passwordError && { borderColor: 'red' }]}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                autoComplete="password"
                secureTextEntry={showPassword}
                placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
              />
            </View>
            <View style={styles.formGroup}>
              <TouchableOpacity onPress={() => setShowRepeatPassword(!showRepeatPassword)} style={{
                position: 'absolute',
                right: 10,
                height: '100%',
                justifyContent: 'center',
                margin: 0,
                marginTop: 12,
                zIndex: 1000
              }}>
                {showRepeatPassword ? <EyeOpen /> : <EyeClose />}
              </TouchableOpacity>
              <StyledText litle bold mayus left>Repeat password</StyledText>
              <TextInput
                style={[styles.input, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                  color: mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"],
                }, passwordError && { borderColor: 'red' }]}
                onChangeText={setRepeatPassword}
                value={repeatPassword}
                placeholder="Repeat password"
                autoComplete="password"
                secureTextEntry={showRepeatPassword}
                placeholderTextColor={mode === 'light' ? Colors.light["palette-11"] : Colors.dark["palette-11"]}
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Gender</StyledText>
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
                placeholder="Gender"
              />
            </View>
            {!hasCode && (
              <Btn
                title="Continuar"
                clickable
                onPress={() => {
                  const user = {
                    email: email,
                    phone: phone,
                    password: password,
                    name: name,
                    birthDate: birthdate.toISOString().split('T')[0],
                    genre: gender,
                    lat: latitude,
                    lon: longitude,
                  }
                  const register = async () => {
                    const data = await registerAPI(user);
                    if (data) {
                      router.replace('/');
                    }
                  }
                  register();
                }}
                disabled={emailError || phoneError || nameError || passwordError || genderError || !isMayorEdad}
              />
            )}
            <Link href='/login/code' style={{ textAlign: 'right', marginBottom: 15 }}>
              <StyledText litle underline right full>Ya tienes una cuenta? Accede a continuacion</StyledText>
            </Link>
          </ScrollView>
        </View>
      </View>
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
