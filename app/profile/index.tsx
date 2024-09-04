import { Stack } from "expo-router";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../../components/StyledText";
import { useEffect, useState } from "react";
import Radio from "../../components/Radio";
import getFindAPI from "../../api/find/getFind";
import getSexualidadAPI from "../../api/sexualidad/getSexualidad";
import getEstadoCivilAPI from "../../api/estadoCivil/getSexualidad";
import Btn from "../../ux/Btn";
import useAuth from "../../utilities/login";
import updateUserAPI from "../../api/user/update";
import getUserData from "../../api/user/getData";
import DropDown from "../../components/DropDown";
import studyLevelOptionsAPI from "../../api/studyLevel/studyLevelOptions";
import languageOptionsAPI from "../../api/language/language";
import zodiacOptionsAPI from "../../api/zodiac/getZodiacOptions";
import religionOptionsAPI from "../../api/religion/religionOptionsAPI";
import useScreenMode from "../../utilities/screenMode";
import ImagePreview from "../../components/ImagePreview";
import UploadImage from "../../components/UploadImage";

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

interface StudyLevelInterface {
  id: string;
  text: string;
}

interface LanguageInterface {
  id: string;
  text: string;
}

interface ZodiacInterface {
  id: string;
  text: string;
}

interface ReligionInterface {
  id: string;
  text: string;
}

export default function ProfilePage() {
  const [find, setFind] = useState('');
  const [findOptions, setFindOptions] = useState<FindInterface[]>([]);
  const [sexualidad, setSexualidad] = useState('');
  const [sexualidadOptions, setSexualidadOptions] = useState<SexualidadInterface[]>([]);
  const [estadoCivil, setEstadoCivil] = useState('');
  const [estadoCivilOptions, setEstadoCivilOptions] = useState<EstadoCivilInterface[]>([]);
  const [altura] = useState('');
  const [studies, setStudies] = useState('');
  const [studyLocation, setStudyLocation] = useState('');
  const [studyLevel, setStudyLevel] = useState('');
  const [studyLevelOptions, setStudyLevelOptions] = useState<StudyLevelInterface[]>([]);
  const [work, setWork] = useState('');
  const [chargeWork, setChargeWork] = useState('');
  const [enterprise, setEnterprise] = useState('');
  const [drink, setDrink] = useState('');
  const [language, setLanguage] = useState<string[]>([]);
  const [languageOptions, setLanguageOptions] = useState<LanguageInterface[]>([]);
  const [zodiac, setZodiac] = useState('');
  const [zodiacOptions, setZodiacOptions] = useState<ZodiacInterface[]>([]);
  const [pets, setPets] = useState('');
  const [religion, setReligion] = useState('');
  const [religionOptions, setReligionOptions] = useState<ReligionInterface[]>([]);
  const [bio, setBio] = useState('');
  const [maxCharBio] = useState(200);
  const [languageResponse, setLanguageResponse] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [photo, setPhoto] = useState<{
    uri: string;
    type: string;
    name: string;
  }>();

  useEffect(() => {
    let aux = '';
    languageOptions.forEach((item) => {
      if (language.includes(item.id)) {
        aux += item.text + ', ';
      }
    });
    setLanguageResponse(aux);
  }, [language, languageOptions])

  useEffect(() => {
    const getSexualidad = async () => {
      const data = await getSexualidadAPI();
      setSexualidadOptions(data);
    }
    getSexualidad();
  }, [])

  useEffect(() => {
    const getFind = async () => {
      const data = await getFindAPI();
      setFindOptions(data);
    }
    getFind();
  }, [])

  useEffect(() => {
    const getEstadoCivil = async () => {
      const data = await getEstadoCivilAPI();
      setEstadoCivilOptions(data);
    }
    getEstadoCivil();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const token = await getToken() ?? '';
      const data = await getUserData({ token });
      if (data?.user_info) {
        setEstadoCivil(data?.user_info.id_status);
        setSexualidad(data?.user_info.id_orientation);
        setDrink(`${data?.user_info.drink}`);
        setLanguage(data?.user_info.language);
        setZodiac(data?.user_info.id_zodiac);
        setPets(`${data?.user_info.mascotas}`);
        setReligion(data?.user_info.id_religion);
        setStudies(`${data?.user_info.studies}`);
        setFind(`${data?.user_info.id_find}`);
        setBio(data?.user_info.bio);
        setWork(`${data?.user_info.you_work}`);
        setChargeWork(`${data?.user_info.charge_work}`);
        setEnterprise(`${data?.user_info.enterprise}`);
        setPhotos(data?.user_info.photos);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await studyLevelOptionsAPI();
      setStudyLevelOptions(data);
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await languageOptionsAPI();
      setLanguageOptions(data);
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await zodiacOptionsAPI();
      setZodiacOptions(data);
    }
    getData();
  }, [])

  useEffect(() => {
    const getData = async () => {
      const data = await religionOptionsAPI();
      setReligionOptions(data);
    }
    getData();
  }, [])

  const { getToken } = useAuth();

  const { mode } = useScreenMode()

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => null,
        }}
      />
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <ScrollView>
            <StyledText title bold mayus center>
              Tu perfil - actualiza tu perfil
            </StyledText>
            {/* INDICA TU ESTADO CIVIL */}
            <DropDown
              title="Relacion"
              response={estadoCivilOptions.find((item) => item.id === estadoCivil)?.text}
            >
              {estadoCivilOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index + 1}
                >
                  <Radio checked={estadoCivil === item.id} onPress={() => setEstadoCivil(estadoCivil === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* INDICA TU SEXUALIDAD */}
            <DropDown
              title="Orientación"
              response={sexualidadOptions.find((item) => item.id === sexualidad)?.text}
            >
              {sexualidadOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index + 1}
                >
                  <Radio checked={sexualidad === item.id} onPress={() => setSexualidad(sexualidad === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* BEBES ALCOHOL */}
            <DropDown
              title="¿bebes?"
              response={drink === '1' ? 'En sociedad' : drink === '2' ? 'Nunca' : drink === '3' ? 'A menudo' : drink === '4' ? 'Me mantengo sobrio' : drink === '5' ? 'Preferiria no decirlo' : ''}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={drink === '1'} onPress={() => setDrink(drink === '1' ? '0' : '1')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  En sociedad
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={drink === '2'} onPress={() => setDrink(drink === '2' ? '0' : '2')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  Nunca
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={drink === '3'} onPress={() => setDrink(drink === '3' ? '0' : '3')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  A menudo
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={drink === '4'} onPress={() => setDrink(drink === '4' ? '0' : '4')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  Me mantengo sobrio
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={drink === '5'} onPress={() => setDrink(drink === '5' ? '0' : '5')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  Preferiria no decirlo
                </StyledText>
              </View>
            </DropDown>

            {/* Que idioma hablas? */}
            <DropDown
              title="Que idioma hablas?"
              response={languageResponse}
            >
              {languageOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index + 1}
                >
                  <Radio multioption checked={language.includes(item.id)} onPress={() => setLanguage(language.includes(item.id) ? language.filter((i) => i !== item.id) : [...language, item.id])} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* SIGNO DEL ZODIACO */}
            <DropDown
              title="Signo del zodiaco"
              response={zodiacOptions.find((item) => item.id === zodiac)?.text}
            >
              {zodiacOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <Radio checked={zodiac === item.id} onPress={() => setZodiac(zodiac === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item?.text?.split('-')[0]?.trim()}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* MASCOTAS */}
            <DropDown
              title="Tienes mascotas?"
              response={pets === '1' ? 'Si' : pets === '0' ? 'No' : ''}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={pets === '1'} onPress={() => setPets(pets === '1' ? '' : '1')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  Si
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={pets === '0'} onPress={() => setPets(pets === '0' ? '' : '0')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  No
                </StyledText>
              </View>
            </DropDown>

            {/* Religion */}
            <DropDown
              title="Religion"
              response={religionOptions.find((item) => item.id === religion)?.text}
            >
              {religionOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <Radio checked={religion === item.id} onPress={() => setReligion(religion === item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* QUIERS AGREGAR INFORMACION DE TUS ESTUDIOS */}
            <DropDown
              title="Quieres agregar información de tus estudios?"
              response={studies === '1' ? 'Si' : studies === '0' ? 'No' : ''}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={studies === '1'} onPress={() => setStudies(studies === '1' ? '' : '1')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  Si
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={studies === '0'} onPress={() => setStudies(studies === '0' ? '' : '0')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  No
                </StyledText>
              </View>
            </DropDown>

            {studies === '1' && (
              <>
                {/* DONDE ESTUDIASTE */}
                <DropDown
                  title="Donde estudiaste"
                  response={studyLocation}
                >
                  <TextInput
                    style={[styles.imput, {
                      borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                    }]}
                    onChangeText={setStudyLocation}
                    value={studyLocation}
                    placeholder="Study location"
                  />
                </DropDown>

                {/* NIVEL DE ESTUDIO */}
                <DropDown
                  title="Nivel de estudio"
                  response={studyLevel}
                >
                  {studyLevelOptions.map((item, index) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 5,
                      }}
                      key={index}
                    >
                      <Radio checked={studyLevel === item.id} onPress={() => setStudyLevel(studyLevel === item.id ? '0' : item.id)} style={{
                        marginRight: 10,
                      }} />
                      <StyledText litle bold left>
                        {item.text}
                      </StyledText>
                    </View>
                  ))}
                </DropDown>
              </>
            )}

            {/* QUE BUSCAS */}
            <DropDown
              title="Que buscas?"
              response={findOptions.find((item) => item.id == find)?.text}
            >
              {findOptions.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}
                  key={index}
                >
                  <Radio checked={find == item.id} onPress={() => setFind(find == item.id ? '0' : item.id)} style={{
                    marginRight: 10,
                  }} />
                  <StyledText litle bold left>
                    {item.text}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* EXPLICA TUS MOTIVOS PARA ESTAR AQUI */}
            <DropDown
              title="Explica tus motivos para estar aquí"
              response={bio}
            >
              <TextInput
                style={[styles.textArea, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
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
                <StyledText xsmall right red={bio?.length > maxCharBio}>
                  {bio?.length}/{maxCharBio}
                </StyledText>
              </View>
            </DropDown>

            {/* TRABAJO */}
            <DropDown
              title="Trabajas actualmente?"
              response={work === '1' ? 'Si' : work === '0' ? 'No' : ''}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={work === '1'} onPress={() => setWork(work === '1' ? '' : '1')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  Si
                </StyledText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                }}
              >
                <Radio checked={work === '0'} onPress={() => setWork(work === '0' ? '' : '0')} style={{
                  marginRight: 10,
                }} />
                <StyledText litle bold left>
                  No
                </StyledText>
              </View>
            </DropDown>

            {work === '1' && (
              <>
                <DropDown
                  title="De que trabajas actualmente"
                  response={chargeWork}
                >
                  <TextInput
                    style={[styles.imput, {
                      borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                    }]}
                    onChangeText={setChargeWork}
                    value={chargeWork}
                    placeholder="Charge work"
                  />
                </DropDown>
                <DropDown
                  title="Empresa en la que trabajas actualmente"
                  response={enterprise}
                >
                  <TextInput
                    style={[styles.imput, { borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'] }]}
                    onChangeText={setEnterprise}
                    value={enterprise}
                    placeholder="Enterprise"
                  />
                </DropDown>
              </>
            )}

            <DropDown
              title="Fotos de tu perfil"
            >
              <View
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  gap: 20,
                  marginTop: 30,
                }}
              >
                {
                  photos.map((item, index) => (
                    <ImagePreview key={index} photo={item} />
                  ))
                }
                <UploadImage
                  setPhoto={setPhoto}
                />
              </View>
            </DropDown>

            <Btn title="Actualizar el perfil" clickable onPress={() => {
              const updateUser = async () => {
                updateUserAPI({
                  token: await getToken() ?? '',
                  id_find: find,
                  id_orientation: sexualidad,
                  id_status: estadoCivil,
                  bio: bio,
                  height: altura,
                  studyPlace: studyLocation,
                  you_work: work,
                  charge_work: chargeWork,
                  enterprise: enterprise,
                  drink: drink,
                  language: language,
                  id_zodiac: zodiac,
                  mascotas: pets,
                  id_religion: religion,
                })
              }
              updateUser()
            }} />
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
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  textArea: {
    borderWidth: 1,
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
    marginTop: 20,
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
  imput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
