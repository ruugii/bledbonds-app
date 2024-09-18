import React, { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/Card/Page";
import StyledText from "../../components/StyledText";
import Dislike from "../../Icons/Dislike";
import SuperLike from "../../Icons/Superlike";
import Like from "../../Icons/Like";
import Undo from "../../Icons/undo";
import { Colors } from "../../constants/Colors";
import { Stack } from "expo-router";
import Party from "../../Icons/Party";
import CalendarIcon from "../../Icons/CalendarIcon";
import Chat from "../../Icons/Chat";
import useAuth from "../../utilities/login";
import CitasCiegas from "../../Icons/CitasCiegas";
import menuEnabled from "../../api/menu/menuenabled";
import Swiper from "react-native-deck-swiper";
import Menu from "../../components/Menu/Menu";
import useScreenMode from "../../utilities/screenMode";
import getToLike from "../../api/user/getToLike";
import likeActionAPI from "../../api/actions/likeAPI";
import DislikeActionAPI from "../../api/actions/DislikeAPI";

const swiperRef = React.createRef<Swiper<{ fotos: string[]; aficiones: string[]; description: string; location: { lat: number; lon: number; }; name: string; age: string; }>>();

interface UserInterface {
  fotos: string[];
  aficiones: string[];
  description: string;
  location: {
    lat: number;
    lon: number;
  };
  name: string;
  age: string;
  id: string;
}

export default function Match() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [usersCount, setUsersCount] = useState(0);

  const calculateAge = (birthday: Date): string => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    let age = today.getFullYear() - birthdayDate.getFullYear();
    const m = today.getMonth() - birthdayDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
      age--;
    }
    return `${age}`;
  };

  useEffect(() => {
    const getUsers = async () => {
      const token = await getToken()
      const userRandom = await getToLike({ token: token ?? '' });
      if (userRandom.status !== '-0001') {
        setUsersCount(userRandom.count[0]['COUNT(*)']);
        for (const user of userRandom.userRandom) {
          console.log(user);
          setUsers(
            users => [
              ...users,
              {
                fotos: user.fotos ?? [],
                aficiones: user.aficiones ?? [],
                description: user.bio ?? '',
                location: { lat: user?.lat ?? 0, lon: user?.lon ?? 0 },
                name: user.name,
                age: calculateAge(new Date(user.birthdate)) ?? '',
                id: user.id,
              }
            ]
          )
        }
      }
    }
    getUsers();
  }, [])
  const { isLoggedIn, getToken } = useAuth();

  const [usersIndex, setUsersIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(users[usersIndex]);
  const [match, setMatch] = useState(false);
  const [matchEnabled, setMatchEnabled] = useState(false);
  const [like] = useState(false);
  const [dislike] = useState(false);
  const [moreThan50, setMoreThan50] = useState(false);

  const undoUser = () => {
    prev();
  };

  const DislikeUser = async () => {

    const token = await getToken();
    const result = await DislikeActionAPI({
      token: token ?? '',
      id: users[usersIndex].id,
    })
    nextUser()
  };

  const SuperLikeUser = () => {
    nextUser();
  };

  const LikeUser = async () => {
    setUsersCount(usersCount + 1);
    if (usersCount >= 50) {
      console.log('No puedes dar like a mas de 50 usuarios');
      setMoreThan50(true);
    } else {
      const token = await getToken();
      const result = await likeActionAPI({
        token: token ?? '',
        id: users[usersIndex].id,
      })

      if (result && result.IsMatch === true) {
        setCurrentUser(users[usersIndex]);
        setMatch(true);
      } else {
        nextUser()
      }
    }
  };

  const nextUser = () => {
    if (users.length <= usersIndex + 1) {
      setCurrentUser(users[0]);
      setUsersIndex(0);
    } else {
      setCurrentUser(users[usersIndex + 1]);
      setUsersIndex(usersIndex + 1);
    }
  };

  const prev = () => {
    setCurrentUser(users[usersIndex - 1]);
    setUsersIndex(usersIndex - 1);
  };

  const [menuOptions, setMenuOptions] = useState([
    {
      id: 0,
      text: "",
      selected: false,
      url: "",
      icon: <></>,
      active: false,
    },
  ]);

  useEffect(() => {
    console.log('usersCount', usersCount)
  }, [usersCount]);

  useEffect(() => {
    const getMenu = async () => {
      const matches = await menuEnabled({ key: 'matches' });
      const events = await menuEnabled({ key: 'events' });
      const calendar = await menuEnabled({ key: 'calendar' });
      const chat = await menuEnabled({ key: 'chat' });
      const citasCiegas = await menuEnabled({ key: 'ciegas' });
      const aux = []
      if (matches.Valor === '1') {
        setMatchEnabled(true);
        aux.push({
          id: 1,
          text: "MATCHES",
          selected: true,
          url: "/matches",
          icon: <Like black />,
          active: true,
        });
      }
      if (events.Valor === '1') {
        aux.push(
          {
            id: 2,
            text: "EVENTS",
            selected: false,
            url: "/events",
            icon: <Party black />,
            active: false,
          }
        );
      }
      if (calendar.Valor === '1') {
        aux.push({
          id: 3,
          text: "CALENDAR",
          selected: false,
          url: "/calendar",
          icon: <CalendarIcon black />,
          active: false,
        });
      }
      if (chat.Valor === '1') {
        aux.push({
          id: 4,
          text: 'CHAT',
          selected: false,
          url: '/chat',
          icon: <Chat black />,
          active: false,
        });
      }
      if (citasCiegas.Valor === '1') {
        aux.push({
          id: 5,
          text: 'CITAS A CIEGAS',
          selected: false,
          url: '/citasCiegas',
          icon: <CitasCiegas black />,
          active: false,
        });
      }
      setMenuOptions(aux);
    };
    getMenu();
  }, []);

  const { mode } = useScreenMode()

  if (!isLoggedIn) {
    return <></>;
  } else if (!matchEnabled) {
    return (
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <StyledText bold center title mayus>
          Actualmente esta función no está activada.
        </StyledText>
      </View>
    );
  } else {
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: () => null,
          }}
        />
        <View style={{
          flex: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
          {users.length > 0 ? (
            <Swiper
              cards={users}
              ref={swiperRef}
              renderCard={(card) => (
                <Card
                  name={card.name || ''}
                  age={card.age || ''}
                  aficiones={card.aficiones || []}
                  description={card.description || ''}
                  location={card.location || {
                    lat: 0,
                    lon: 0,
                  }}
                  url={card.fotos || []}
                  like={like}
                  dislike={dislike}
                >
                  <View style={styles.cardButtons}>
                    <TouchableOpacity
                      onPress={undoUser}
                      style={[styles.undoButton, {
                        borderColor: mode === 'light' ? Colors.light.buttonUndoEnabled : Colors.dark.buttonUndoEnabled,
                        backgroundColor: mode === 'light' ? Colors.light.buttonUndoEnabled : Colors.dark.buttonUndoEnabled,
                      }, usersIndex === 0 && {
                        borderColor: mode === 'light' ? Colors.light.buttonUndoDisabled : Colors.dark.buttonUndoDisabled,
                        backgroundColor: mode === 'light' ? Colors.light.buttonUndoDisabled : Colors.dark.buttonUndoDisabled,
                      }]}
                      disabled={usersIndex === 0}
                    >
                      <Undo
                        black
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => swiperRef?.current?.swipeLeft()}
                      style={[styles.dislikeButton, {
                        borderColor: mode === 'light' ? Colors.light.buttonDislike : Colors.dark.buttonDislike,
                        backgroundColor: mode === 'light' ? Colors.light.buttonDislike : Colors.dark.buttonDislike,
                      }]}
                    >
                      <Dislike
                        black
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => swiperRef?.current?.swipeRight()}
                      style={[styles.likeButton, {
                        borderColor: mode === 'light' ? Colors.light.buttonLike : Colors.dark.buttonLike,
                        backgroundColor: mode === 'light' ? Colors.light.buttonLike : Colors.dark.buttonLike,
                      }]}
                    >
                      <Like
                        black
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={SuperLikeUser}
                      style={[styles.superlikeButton, {
                        borderColor: mode === 'light' ? Colors.light.buttonSuperlike : Colors.dark.buttonSuperlike,
                        backgroundColor: mode === 'light' ? Colors.light.buttonSuperlike : Colors.dark.buttonSuperlike,
                      }]}
                    >
                      <SuperLike
                        black
                      />
                    </TouchableOpacity>
                  </View>
                </Card>
              )}
              verticalSwipe={false}
              stackSize={2}
              onSwipedLeft={() => {
                DislikeUser();
              }}
              onSwipedRight={LikeUser}
              animateOverlayLabelsOpacity
              animateCardOpacity
              overlayLabels={{
                left: {
                  title: "DISLIKE",
                  style: {
                    label: {
                      backgroundColor: "red",
                      color: "white",
                      fontSize: 24,
                    },
                    wrapper: {
                      flecDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: -20,
                    }
                  }
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      backgroundColor: "green",
                      color: "white",
                      fontSize: 24,
                    },
                    wrapper: {
                      flecDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: 20,
                    }
                  }
                }
              }}
            />
          ) : (
            <View
              style={{
                height: '90%',
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
                paddingHorizontal: 10,
              }}
            >
              <StyledText bold center title mayus red>
                {usersCount >= 50 ? 'NO PUEDES DAR LIKE A MAS DE 50 USUARIOS' : `Actualmente no hay mas usuarios, porfavor intente mas tarde.`}
              </StyledText>
            </View>
          )}
          <View style={[styles.menuContainer, {
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
          }]}>
            <Menu options={menuOptions} />
          </View>
        </View>
        {match && (
          <Modal>
            <View style={[styles.container_modal, {
              backgroundColor: (mode === 'light') ? Colors.light["palette-3_transparent"] : Colors.dark["palette-3_transparent"],
            }]}>
              <StyledText bold center title mayus>
                ¡Has dado match con {currentUser.name}!
              </StyledText>
              <View style={styles.matchImage}>
                <Image source={{ uri: currentUser.fotos[0] }} style={styles.matchImage} />
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setMatch(false);
                  nextUser();
                }}
              >
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
        {moreThan50 && (
          <Modal>
            <View style={[styles.container_modal, {
              backgroundColor: (mode === 'light') ? Colors.light["palette-3_transparent"] : Colors.dark["palette-3_transparent"],
            }]}>
              <StyledText bold center title mayus>
                ¡No puedes dar like a mas de 50 usuarios!
              </StyledText>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setMoreThan50(false);
                }}
              >
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  cardImages: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  card: {
    flex: 0.85,
    // height: '95%',
    backgroundColor: 'blue',
    // margin: 24,
    // marginVertical: 24,
    borderRadius: 14,
    overflow: 'hidden', // Asegura que el contenido respete el borderRadius
    elevation: 5,
  },
  container_modal: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
    width: '100%',
  },
  matchImage: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 24,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  undoButton: {
    padding: 10,
    borderRadius: 300,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 50,
    maxHeight: 50,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
  },
  dislikeButton: {
    padding: 10,
    borderRadius: 300,
    minWidth: 60,
    minHeight: 60,
    maxWidth: 60,
    maxHeight: 60,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
  },
  superlikeButton: {
    padding: 10,
    borderRadius: 300,
    minWidth: 50,
    minHeight: 50,
    maxWidth: 50,
    maxHeight: 50,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
  },
  likeButton: {
    padding: 10,
    borderRadius: 300,
    minWidth: 60,
    minHeight: 60,
    maxWidth: 60,
    maxHeight: 60,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 5,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80, // Ajusta la altura según sea necesario
    flex: 1,
    // paddingHorizontal: 20,
    elevation: 15,
  },
});
