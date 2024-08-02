import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const swiperRef = React.createRef<Swiper<{ fotos: string[]; aficiones: string[]; description: string; location: string; name: string; age: string; }>>();

export default function Match() {
  const users = [
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat... Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat... Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat... Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat... Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 2",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 3",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 4",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 5",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 6",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 7",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 8",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 9",
      age: "22",
    },
    {
      fotos: [
        "https://i.pinimg.com/280x280_RS/74/43/c2/7443c297a5735055c4485538f5596086.jpg",
        "https://i.redd.it/xf0a7fpmpfl51.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQ2BNccKgO3GBJ4Y4kq4ESnRrd2IxKYBVUA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpTuQK32AI2k8ZgatqIUYTAhzD8ekGyY_9jg&s",
        "https://i.pinimg.com/736x/93/aa/5d/93aa5d79190f22d7b7f09a10c74bf0c7.jpg",
      ],
      aficiones: ["Futbol", "Cine", "Viajar", "Comer", "Bailar"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
      location: "Madrid",
      name: "TEST 10",
      age: "22",
    },
  ];
  const { isLoggedIn } = useAuth();

  const [usersIndex, setUsersIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState(users[usersIndex]);
  const [prevUser, setPrevUser] = useState(users[usersIndex - 1]);
  const [match, setMatch] = useState(false);
  const [matchEnabled, setMatchEnabled] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const undoUser = () => {
    prev();
  };

  const DislikeUser = () => {
    nextUser();
  };

  const SuperLikeUser = () => {
    nextUser();
  };

  const LikeUser = () => {
    const number = Math.floor(Math.random() * 10);
    console.log(number > 5);

    if (number > 5) {
      setMatch(true);
    } else {
      nextUser();
    }
  };

  const nextUser = () => {
    if (users.length <= usersIndex + 1) {
      setPrevUser(users[usersIndex]);
      setCurrentUser(users[0]);
      setUsersIndex(0);
    } else {
      setPrevUser(users[usersIndex]);
      setCurrentUser(users[usersIndex + 1]);
      setUsersIndex(usersIndex + 1);
    }
  };

  const prev = () => {
    setCurrentUser(users[usersIndex - 1]);
    setUsersIndex(usersIndex - 1);
    setPrevUser(users[usersIndex - 1]);
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
            icon: <Party />,
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
          icon: <CalendarIcon />,
          active: false,
        });
      }
      if (chat.Valor === '1') {
        aux.push({
          id: 4,
          text: 'CHAT',
          selected: false,
          url: '/chat',
          icon: <Chat />,
          active: false,
        });
      }
      if (citasCiegas.Valor === '1') {
        aux.push({
          id: 5,
          text: 'CITAS A CIEGAS',
          selected: false,
          url: '/citasCiegas',
          icon: <CitasCiegas />,
          active: false,
        });
      }
      setMenuOptions(aux);
    };
    getMenu();
  }, []);

  if (!isLoggedIn) {
    return <></>;
  } else if (!matchEnabled) {
    return (
      <View style={[styles.container]}>
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
          backgroundColor: 'red',
          alignContent: 'center',
          alignItems: 'center',
        }}>
          <Swiper
            cards={users}
            ref={swiperRef}
            renderCard={(card) => (
              <Card
                name={card.name || ''}
                age={card.age || ''}
                aficiones={card.aficiones || []}
                description={card.description || ''}
                location={card.location || ''}
                url={card.fotos || []}
                like={like}
                dislike={dislike}
              >
                <View style={styles.cardButtons}>
                  <TouchableOpacity
                    onPress={undoUser}
                    style={[styles.undoButton, usersIndex === 0 && styles.undoButtonDisabled]}
                    disabled={usersIndex === 0}
                  >
                    <Undo />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => swiperRef?.current?.swipeLeft()}
                    style={styles.dislikeButton}
                  >
                    <Dislike />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => swiperRef?.current?.swipeRight()}
                    style={styles.likeButton}
                  >
                    <Like />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={SuperLikeUser}
                    style={styles.superlikeButton}
                  >
                    <SuperLike />
                  </TouchableOpacity>
                </View>
              </Card>
            )}
            verticalSwipe={false}
            stackSize={2}
            onSwipedLeft={DislikeUser}
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
          <View style={styles.menuContainer}>
            <Menu options={menuOptions} />
          </View>
        </View>
        {match && (
          <Modal>
            <View style={[styles.container_modal]}>
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
    backgroundColor: Colors.light["palette-3_transparent"],
    flexDirection: 'column',
    paddingHorizontal: 20,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.light["palette-3"],
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
    borderColor: Colors.light.buttonUndoEnabled,
    backgroundColor: Colors.light.buttonUndoEnabled,
  },
  undoButtonDisabled: {
    borderColor: Colors.light.buttonUndoDisabled,
    backgroundColor: Colors.light.buttonUndoDisabled,
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
    borderColor: Colors.light.buttonDislike,
    backgroundColor: Colors.light.buttonDislike,
  },
  superlikeButton: {
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
    borderColor: Colors.light.buttonSuperlike,
    backgroundColor: Colors.light.buttonSuperlike,
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
    borderColor: Colors.light.buttonLike,
    backgroundColor: Colors.light.buttonLike,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80, // Ajusta la altura según sea necesario
    backgroundColor: Colors.light["palette-3"],
    flex: 1,
    paddingHorizontal: 20,
    elevation: 15,
  },
});
