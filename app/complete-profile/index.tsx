import { router, Stack } from "expo-router";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../../components/StyledText";
import Input from "../../ux/Input";
import { useEffect, useState } from "react";
import Radio from "../../components/Radio";
import getFindAPI from "../../api/find/getFind";
import getSexualidadAPI from "../../api/sexualidad/getSexualidad";
import getEstadoCivilAPI from "../../api/estadoCivil/getSexualidad";
import Btn from "../../ux/Btn";
import useAuth from "../../utilities/login";
import updateUserAPI from "../../api/user/update";
import getUserData from "../../api/user/getData";

interface FindInterface {
  id: string;
  text: string;
}

interface SexualidadInterface {
  id: string;
  text: string;
}

interface EstadoCivilInterface {
  id: string;
  text: string;
}

export default function CompleteProfilePage() {
  const [valueError, setValueError] = useState(false);
  const [value, setValue] = useState('');
  const [find, setFind] = useState('0');
  const [findOptions, setFindOptions] = useState<FindInterface[]>([]);
  const [sexualidad, setSexualidad] = useState('0');
  const [sexualidadOptions, setSexualidadOptions] = useState<SexualidadInterface[]>([]);
  const [estadoCivil, setEstadoCivil] = useState('0');
  const [estadoCivilOptions, setEstadoCivilOptions] = useState<EstadoCivilInterface[]>([]);
  const [bio, setBio] = useState('');
  const [maxCharBio] = useState(200);

  useEffect(() => {
    const getSexualidad = async () => {
      const data = await getSexualidadAPI();
      console.log('sexualidad', data);
      setSexualidadOptions(data);
    }
    getSexualidad();
  }, [])

  useEffect(() => {
    const getFind = async () => {
      const data = await getFindAPI();
      console.log(data);
      setFindOptions(data);
    }
    getFind();
  }, [])

  useEffect(() => {
    const getEstadoCivil = async () => {
      const data = await getEstadoCivilAPI();
      console.log(data);
      setEstadoCivilOptions(data);
    }
    getEstadoCivil();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const token = await getToken() || '';
      const data = await getUserData({ token });
      if (data.user_info) {
        setFind(data.user_info.id_find);
        setSexualidad(data.user_info.id_orientation);
        setEstadoCivil(data.user_info.id_status);
        setBio(data.user_info.bio);
      }
    }
    getData();
  }, [])

  const { getToken } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => null,
        }}
      />
      <View style={[styles.container]}>
        <View style={[styles.box, styles.box2]}>
          <ScrollView>
            <StyledText title bold mayus center>
              Completa tu perfil
            </StyledText>
            <View>
              <StyledText litle bold left>
                Que buscas?
              </StyledText>
              {findOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <Radio checked={find === item.id} onPress={() => setFind(find === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </View>
            <View style={{
              marginTop: 10,
            }}>
              <StyledText litle bold left>
                Indica tu sexualidad
              </StyledText>
              {sexualidadOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <Radio checked={sexualidad === item.id} onPress={() => setSexualidad(sexualidad === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </View>
            <View style={{
              marginTop: 10,
            }}>
              <StyledText litle bold left>
                Indica tu estado civil actual
              </StyledText>
              {estadoCivilOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <Radio checked={estadoCivil === item.id} onPress={() => setEstadoCivil(estadoCivil === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </View>
            <View style={{
              marginTop: 10,
            }}>
              <StyledText litle bold left>
                Explicanos un poco mas sobre ti
              </StyledText>
              <TextInput
                style={[styles.textArea, {
                  borderColor: Colors.light['palette-1'],
                  marginTop: 10,
                }]}
                placeholder="Escribe aquí"
                value={bio}
                onChangeText={(text) => setBio(text)}
                multiline
                numberOfLines={4}
              />
              <View style={{
                marginVertical: 10,
              }}
              >
                <StyledText xsmall right red={bio.length > maxCharBio}>
                  {bio.length}/{maxCharBio}
                </StyledText>
              </View>
            </View>
            <Btn title="Completar Perfil" onPress={() => {
              const updateUser = async () => {
                const token = await getToken() || '';
                const data = await updateUserAPI({
                  token: token,
                  id_find: find,
                  id_orientation: sexualidad,
                  id_status: estadoCivil,
                  bio: bio
                })
                if (data) {
                  router.replace('/')
                }
              }
              updateUser();
            }} clickable />
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.light["palette-3"],
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.light["palette-1"],
    padding: 10,
    borderRadius: 10,
    height: 100,  // Adjust height as needed
    textAlignVertical: 'top',  // Ensure text starts at the top of the input
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
    marginTop: 20,
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
