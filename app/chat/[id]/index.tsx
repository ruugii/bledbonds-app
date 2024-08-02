import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import StyledText from "../../../components/StyledText";
import Calendar from "../../../components/Calendar/page";
import Like from "../../../Icons/Like";
import Party from "../../../Icons/Party";
import CalendarIcon from "../../../Icons/CalendarIcon";
import Chat from "../../../Icons/Chat";
import Menu from "../../../components/Menu/Menu";
import { useEffect, useRef, useState } from "react";
import getAllChats from "../../../api/chat/getAllChats";
import Message from "../../../components/Message";
import { io, Socket } from "socket.io-client";
import getChatByEvent from "../../../api/events/getChatByEvent";

interface chat {
  sender: string;
  message: string;
}

export default function ChatPage() {
  const { id } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
// {"message": "Sss", "sender": "Usuario 1"}
  const [chat_, setChat] = useState<[chat]>();

const [socket, setSocket] = useState<Socket | null>(null); 
const [newMessage, setNewMessage] = useState("");

useEffect(() => {
  const socket = io('https://api.bledbonds.es');
  setSocket(socket);

  seeChat(id.toString());
}, []);

useEffect(() => {
  socket?.on(`chat message ${id}`, (msg) => {
    seeChat(parseInt(id));
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
  // setChat([...chat, { sender: "Yo", message: newMessage }]);
  setNewMessage("");
}

const [chatName, setChatName] = useState("");

const seeChat = async (idEvent: number) => {
  const fetchChat = async (idEvent: number) => {
    const data = await getChatByEvent(idEvent);
    console.log('data', data);
    // messages: [ { ID_message: 2, ID_user: 11, ID_chat: 1, message: 'HOLA MUNDO' } ]
    setChatName(data.chatName)
    console.log('data.messages', data.messages[0].ID_user);
    console.log('data.messages', data.messages[0].message);
    
    
    setChat(
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

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Chat ${id}`,
        }}
      />
      <View style={[styles.container]}>
        <View style={[styles.box, styles.box2]}>
          <View style={[styles.mailPage]}>
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
                  key={i}
                />
              ))}
            </ScrollView>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: Colors.light["palette-11"],
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              gap: 10
            }}>
              <TextInput
                style={{
                  backgroundColor: Colors.light["palette-4"],
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
                  backgroundColor: Colors.light["palette-5"],
                }}
                onPress={() => {
                  console.log('enviar mensaje');
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
    backgroundColor: Colors.light["palette-3"],
    flexDirection: 'column',
  },
  imput: {
    borderWidth: 1,
    borderColor: Colors.light["palette-1"],
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
