import { Stack, useLocalSearchParams } from "expo-router";
import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import StyledText from "../../../components/StyledText";
import { useEffect, useRef, useState } from "react";
import Message from "../../../components/Message";
import { io, Socket } from "socket.io-client";
import getChatByEvent from "../../../api/events/getChatByEvent";
import useScreenMode from "../../../utilities/screenMode";

interface Chat {
  sender: string;
  message: string;
}

export default function ChatPage() {
  const { id } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
// {"message": "Sss", "sender": "Usuario 1"}
  const [chat_, setChat_] = useState<[Chat]>();

const [socket, setSocket] = useState<Socket | null>(null); 
const [newMessage, setNewMessage] = useState("");

useEffect(() => {
  const socket = io('https://api.bledbonds.es');
  setSocket(socket);

  seeChat(Number(id));
}, []);

useEffect(() => {
  socket?.on(`chat message ${id}`, (msg) => {
    seeChat(Number(id));
  })
}, [socket, id])

useEffect(() => {
  scrollViewRef.current?.scrollToEnd({ animated: true });
}, [chat_]);

const sendMessage = () => {
  socket?.emit(`chat message`, {
    userId: '10',
    message: newMessage,
    chatId: id,
  });
  setNewMessage("");
}

const seeChat = async (idEvent: number) => {
  const fetchChat = async (idEvent: number) => {
    const data = await getChatByEvent(idEvent);
    setChat_(
      data?.messages?.map((item: {
        ID_user: string;
        message: string;
      }, i:number) => ({
        sender: item.ID_user == '10' ? "Yo" : "Usuario",
        message: item.message,
      })) || []
    )
  }
  await fetchChat(idEvent);
}

  const { mode } = useScreenMode()

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Chat ${id}`,
        }}
      />
      <View style={[styles.container, {
        backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
      }]}>
        <View style={[styles.box, styles.box2, {
          backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"],
        }]}>
          <View style={[styles.mailPage, {
            backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"]
          }]}>
            <ScrollView 
              style={{
                margin: 20,
                marginBottom: 40,
              }}
              ref={scrollViewRef}
            >
              {chat_?.map((m, i) => (
                <Message
                  sender={m.sender}
                  message={m.message}
                  isMine={m.sender === "Yo" || m.sender === "Usuario 1"}
                  key={i + 1}
                />
              ))}
            </ScrollView>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 1,
              backgroundColor: (mode === 'light') ? Colors.light["palette-11"] : Colors.dark["palette-11"],
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              gap: 10
            }}>
              <TextInput
                style={{
                  backgroundColor: (mode === 'light') ? Colors.light["palette-4"] : Colors.dark["palette-4"],
                  width: '80%',
                  height: '100%',
                  paddingLeft: 10,
                  // marginRight: 5,
                }}
                onBlur={() => Keyboard.dismiss()}
                placeholder="Escribe un mensaje"
                onChange={(e) => setNewMessage(e.nativeEvent.text)}
                value={newMessage}
              />
              <TouchableOpacity
                style={{
                  width: '20%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: (mode === 'light') ? Colors.light["palette-5"] : Colors.dark["palette-5"],
                }}
                onPress={() => {
                  sendMessage()
                }}
                >
                <StyledText xsmall bold mayus>
                  Enviar
                </StyledText>
                </TouchableOpacity>
            </View>
          </View>
        </View >
      </View >
    </>
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
