import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import StyledText from "../../components/StyledText";
import Btn from "../../ux/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import getGenderAPI from "../../api/gender/getGenders";
import registerAPI from "../../api/register";
import useAuth from "../../utilities/login";

const getID = (id:string) => {
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

const DatePicker = ({ setDay, setMonth, setYear, dayOptions, monthOptions, yearOptions }) => (
  <View style={{ flexDirection: 'row', gap: 5, width: '100%' }}>
    <View style={{ width: '30%' }}>
      <StyledText xsmall bold mayus left>Día</StyledText>
      <SelectList setSelected={setDay} data={dayOptions} save="text" />
    </View>
    <View style={{ width: '30%' }}>
      <StyledText xsmall bold mayus left>Mes</StyledText>
      <SelectList setSelected={setMonth} data={monthOptions.map((v) => v.name)} setSelected={(value) => {
        setMonth(getID(value));
      }} save="text" />
    </View>
    <View style={{ width: '30%' }}>
      <StyledText xsmall bold mayus left>Año</StyledText>
      <SelectList setSelected={setYear} data={yearOptions} save="text" />
    </View>
  </View>
);

export default function LoginPage() {
  const [isMayorEdad, setIsMayorEdad] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(true);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(true);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState(true);
  const [hasCode, setHasCode] = useState(false);
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState(true);
  const [genderList, setGenderList] = useState()
  const { isLoggedIn, login, logout } = useAuth();
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

  const [dayOptions] = useState(Array.from({ length: 31 }, (_, i) => i + 1));
  const [monthOptions] = useState([
    { id: 1, name: 'Enero' }, { id: 2, name: 'Febrero' }, { id: 3, name: 'Marzo' }, { id: 4, name: 'Abril' },
    { id: 5, name: 'Mayo' }, { id: 6, name: 'Junio' }, { id: 7, name: 'Julio' }, { id: 8, name: 'Agosto' },
    { id: 9, name: 'Septiembre' }, { id: 10, name: 'Octubre' }, { id: 11, name: 'Noviembre' }, { id: 12, name: 'Diciembre' }
  ]);
  const [yearOptions] = useState(Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i));

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
    console.log(password, repeatPassword);
    
    setPasswordError(password !== repeatPassword || password === '');
  }, [password, repeatPassword]);

  useEffect(() => {
    console.log(day, month, year);
    
    if (day && month && year) {
      const date = new Date(year, month - 1, day);
      const currentDate = new Date();
      const monthDifference = currentDate.getMonth() - date.getMonth();
      let age = currentDate.getFullYear() - date.getFullYear();
      if (monthDifference < 0) {
        age--;
      } else if (monthDifference === 0) {
        const dayDifference = currentDate.getDate() - date.getDate();
        if (dayDifference < 0) {
          age--;
        }
      } else if (age < 18 || (age === 18 && monthDifference >= 0)) {
        console.log('menor de edad');
        
        setIsMayorEdad(false)
      } else {
        console.log('mayor de edad');
        setIsMayorEdad(true)
      }
    }
  }, [day, month, year]);

  useEffect(() => {
    console.log(emailError, phoneError, nameError, passwordError, genderError, isMayorEdad);
    console.log(emailError);
    console.log(phoneError);
    console.log(nameError);
    console.log(passwordError);
    console.log(genderError);
    console.log(isMayorEdad);
    console.log((emailError || phoneError || nameError || passwordError|| genderError || !isMayorEdad) ? 'disabled' : 'enabled');
    
  }, [emailError, phoneError, nameError, passwordError, genderError, isMayorEdad]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => <StyledText litle full center bold mayus>REGISTRO</StyledText>,
          headerRight: () => <></>,
        }}
      />
      <View style={styles.container}>
        <View style={[styles.box, styles.box2]}>
          <ScrollView>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Email</StyledText>
              <TextInput
                style={[styles.input, emailError && { borderColor: 'red' }]}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoComplete="email"
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Phone - sin prefijo</StyledText>
              <TextInput
                style={[styles.input, phoneError && { borderColor: 'red' }]}
                onChangeText={setPhone}
                value={phone}
                placeholder="Phone"
                autoComplete="tel"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Nombre</StyledText>
              <TextInput
                style={[styles.input, nameError && { borderColor: 'red' }]}
                onChangeText={setName}
                value={name}
                placeholder="Nombre"
                autoComplete="name"
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Fecha de nacimiento</StyledText>
              <DatePicker setDay={setDay} setMonth={setMonth} setYear={setYear} dayOptions={dayOptions} monthOptions={monthOptions} yearOptions={yearOptions} />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Password</StyledText>
              <TextInput
                style={[styles.input, passwordError && { borderColor: 'red' }]}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                autoComplete="password"
                secureTextEntry
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Repeat password</StyledText>
              <TextInput
                style={[styles.input, passwordError && { borderColor: 'red' }]}
                onChangeText={setRepeatPassword}
                value={repeatPassword}
                placeholder="Repeat password"
                autoComplete="password"
                secureTextEntry
              />
            </View>
            <View style={styles.formGroup}>
              <StyledText litle bold mayus left>Gender</StyledText>
              <SelectList
                setSelected={value => setGender(value)}
                data={genderList?.map((v) => v.genre_name)}
                save="text"
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
                    birthDate: `${year}-${month}-${day}`,
                    genre: gender,
                  }
                  const register = async () => {
                    const data = await registerAPI(user);
                    if (data) {
                      login(true)
                    }
                  }
                  register();
                }}
                disabled={emailError || phoneError || nameError || passwordError|| genderError || !isMayorEdad}
              />
            )}
            <Link href='/login/code' style={{textAlign: 'right', marginBottom: 15}}>
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
    backgroundColor: Colors.light["palette-3"],
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light["palette-1"],
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
    backgroundColor: Colors.light["palette-3"],
  },
});
