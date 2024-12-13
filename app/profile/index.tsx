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
import { uploadImageV2 } from "../../api/image/uploadImageV2";
import deletePhotoAPI from "../../api/user/deletephoto";
import { useTranslation } from "react-i18next";

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

interface DataToUpdate {
  token: string;
  id_find: string;
  id_orientation: string;
  id_status: string;
  bio: string;
  height?: string;
  studyPlace?: string;
  you_work?: string;
  charge_work?: string;
  enterprise?: string;
  drink?: string;
  language?: string[];
  id_zodiac?: string;
  mascotas?: string;
  id_religion?: string;
  photo?: string;
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
  const [maxPhotos] = useState(5);
  const [photo, setPhoto] = useState<{
    uri: string;
    type: string;
    name: string;
  }>();

  const { t } = useTranslation();

  useEffect(() => {

    const uploadPhoto = async () => {
      const imageURL = await uploadImageV2(photo?.uri ?? '', photo?.type ?? '', photo?.name ?? '')
      setPhotos([...photos, imageURL.url ?? ''])
      updateUserAPI(await getJsonToUpdate({
        photo: imageURL.url ?? ''
      }))

    }

    if (photo !== undefined) {
      uploadPhoto()
    }
  }, [photo])

  useEffect(() => {
    let aux = '';
    languageOptions.forEach((item) => {
      if (language.includes(item.id)) {
        aux += `${t(`screens.profile.languageOptions.${item.id}`)} , `;
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

  const getJsonToUpdate = async ({
    photo
  }: {
    photo?: string;
  }): Promise<DataToUpdate> => {
    const data: DataToUpdate = {
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
      photo: photo
    }

    if (!photo) {
      delete data.photo;
    }

    if (altura === '') {
      delete data.height;
    }
    if (studyLocation === '') {
      delete data.studyPlace;
    }
    if (work === '') {
      delete data.you_work;
    }
    if (chargeWork === '') {
      delete data.charge_work;
    }
    if (enterprise === '') {
      delete data.enterprise;
    }
    if (drink === '') {
      delete data.drink;
    }
    if (language.length === 0) {
      delete data.language;
    }
    if (zodiac === '') {
      delete data.id_zodiac;
    }
    if (pets === '') {
      delete data.mascotas;
    }
    if (religion === '') {
      delete data.id_religion;
    }
    if (data.charge_work === 'null') {
      delete data.charge_work;
    }
    if (data.drink === 'null') {
      delete data.drink;
    }
    if (data.enterprise === 'null') {
      delete data.enterprise;
    }
    if (data.mascotas === 'null') {
      delete data.mascotas;
    }
    return data;
  }

  const { getToken } = useAuth();

  const { mode } = useScreenMode()

  return (
    <View style={[styles.container, {
      backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
    }]}>
      <View style={[styles.box, styles.box2, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <ScrollView>
          <View style={{
            paddingHorizontal: 20
          }}>
            <View style={{
              marginTop: 20
            }}>
              <StyledText title bold mayus center>
                {t('screens.profile.title')}
              </StyledText>
            </View>
            {/* INDICA TU ESTADO CIVIL */}
            <DropDown
              title={t('screens.profile.estadoCivil')}
              response={t(`screens.profile.estadoCivilOptions.${estadoCivil}`)}
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
                    {t(`screens.profile.estadoCivilOptions.${item.id}`)}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* INDICA TU SEXUALIDAD */}
            <DropDown
              title={t('screens.profile.sexualidad')}
              response={t(`screens.profile.sexualidadOptions.${sexualidad}`)}
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
                    {t(`screens.profile.sexualidadOptions.${item.id}`)}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* BEBES ALCOHOL */}
            <DropDown
              title={t('screens.profile.drink')}
              response={t(`screens.profile.drinkOptions.${drink}`)}
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
                  {t('screens.profile.drinkOptions.1')}
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
                  {t('screens.profile.drinkOptions.2')}
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
                  {t('screens.profile.drinkOptions.3')}
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
                  {t('screens.profile.drinkOptions.4')}
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
                  {t('screens.profile.drinkOptions.5')}
                </StyledText>
              </View>
            </DropDown>

            {/* Que idioma hablas? */}
            <DropDown
              title={t('screens.profile.language')}
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
                    {t(`screens.profile.languageOptions.${item.id}`)}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* SIGNO DEL ZODIACO */}
            <DropDown
              title={t('screens.profile.zodiac')}
              response={t(`screens.profile.zodiacOptions.${zodiac}`)}
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
                    {t(`screens.profile.zodiacOptions.${item?.id}`)}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* MASCOTAS */}
            <DropDown
              title={t('screens.profile.pets')}
              response={t(`screens.profile.petsOptions.${pets}`)}
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
                  {t('screens.profile.petsOptions.1')}
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
                  {t('screens.profile.petsOptions.0')}
                </StyledText>
              </View>
            </DropDown>

            {/* Religion */}
            <DropDown
              title={t('screens.profile.religion')}
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
                    {t(`screens.profile.religionOptions.${item.id}`)}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* QUIERS AGREGAR INFORMACION DE TUS ESTUDIOS */}
            <DropDown
              title={t('screens.profile.studies')}
              response={t(`screens.profile.studiesOptions.${studies || '0'}`)}
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
                  {t('screens.profile.studiesOptions.1')}
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
                  {t('screens.profile.studiesOptions.0')}
                </StyledText>
              </View>
            </DropDown>

            {studies === '1' && (
              <>
                {/* DONDE ESTUDIASTE */}
                <DropDown
                  title={t('screens.profile.studyLocation')}
                  response={studyLocation}
                >
                  <TextInput
                    style={[styles.imput, {
                      borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                    }]}
                    onChangeText={setStudyLocation}
                    value={studyLocation}
                    placeholder={t('screens.profile.studyLocationPlaceholder')}
                  />
                </DropDown>

                {/* NIVEL DE ESTUDIO */}
                <DropDown
                  title={t('screens.profile.studyLevel')}
                  response={`screens.profile.studyLevelOptions.${studyLevel}`}
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
                        {t(`screens.profile.studyLevelOptions.${item.id}`)}
                      </StyledText>
                    </View>
                  ))}
                </DropDown>
              </>
            )}

            {/* QUE BUSCAS */}
            <DropDown
              title={t('screens.profile.find')}
              response={t(`screens.profile.findOptions.${find || '0'}`)}
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
                    {t(`screens.profile.findOptions.${item.id}`)}
                  </StyledText>
                </View>
              ))}
            </DropDown>

            {/* EXPLICA TUS MOTIVOS PARA ESTAR AQUI */}
            <DropDown
              title={t('screens.profile.bio')}
              response={bio}
            >
              <TextInput
                style={[styles.textArea, {
                  borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                  marginTop: 10,
                }]}
                placeholder={t('screens.profile.bioPlaceholder')}
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
              title={t('screens.profile.work')}
              response={t(`screens.profile.workOptions.${work}`)}
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
                  {t('screens.profile.workOptions.1')}
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
                  {t('screens.profile.workOptions.0')}
                </StyledText>
              </View>
            </DropDown>

            {work === '1' && (
              <>
                <DropDown
                  title={t('screens.profile.chargeWork')}
                  response={chargeWork}
                >
                  <TextInput
                    style={[styles.imput, {
                      borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
                    }]}
                    onChangeText={setChargeWork}
                    value={chargeWork}
                    placeholder={t('screens.profile.chargeWorkPlaceholder')}
                  />
                </DropDown>
                <DropDown
                  title={t('screens.profile.enterprise')}
                  response={enterprise}
                >
                  <TextInput
                    style={[styles.imput, { borderColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'] }]}
                    onChangeText={setEnterprise}
                    value={enterprise}
                    placeholder={t('screens.profile.enterprisePlaceholder')}
                  />
                </DropDown>
              </>
            )}

            <DropDown
              title={t('screens.profile.photos')}
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
                    <ImagePreview key={index + 1} photo={item} onDelete={() => {
                      const deletePhoto = async () => {
                        await deletePhotoAPI({
                          token: await getToken() ?? '',
                          photo: item
                        })
                      }
                      deletePhoto()
                      setPhotos(photos.filter((i) => i !== item))
                    }} />
                  ))
                }
                {photos.length < maxPhotos ? (
                  <UploadImage
                    setPhoto={setPhoto}
                    updatePhoto
                  />
                ) : (
                  <View>
                    <StyledText litle center>
                      {t('screens.profile.photosMax', { maxPhotos })}
                    </StyledText>
                  </View>
                )}
              </View>
            </DropDown>

            <View style={{
              marginBottom: 20
            }}>
              <Btn title={t('screens.profile.updateProfile')} clickable onPress={() => {
                const updateUser = async () => {
                  updateUserAPI(await getJsonToUpdate({}))
                }
                updateUser()
              }} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
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
    height: '100%'
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
