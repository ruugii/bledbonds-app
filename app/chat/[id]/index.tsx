import { Stack, useLocalSearchParams } from "expo-router";
import { Keyboard, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import StyledText from "../../../components/StyledText";
import { useEffect, useRef, useState } from "react";
import Message from "../../../components/Message";
import { io, Socket } from "socket.io-client";
import useScreenMode from "../../../utilities/screenMode";
import getChatData from "../../../api/chat/getChatData";
import useAuth from "../../../utilities/login";

interface Chat {
  sender: string;
  message: string;
  user: boolean;
}

export default function ChatPage() {
  const { id } = useLocalSearchParams();

  const { getToken } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const [chat_, setChat_] = useState<Chat[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const calcButtonBackground = () => {
    if (newMessage.trim() === '') {
      return { backgroundColor: Colors.light["palette-2"] };
    } else {
      return { backgroundColor: Colors.light["palette-4"] };
    }
  }

  useEffect(() => {
    const socket = io('https://api.bledbonds.es');
    setSocket(socket);

    seeChat(Number(id));
    return () => socket.disconnect();  // Cleanup on unmount
  }, []);

  useEffect(() => {
    socket?.on(`chat message ${id}`, (msg) => {
      seeChat(Number(id));
    });
  }, [socket, id]);

  useEffect(() => {
    // Usamos un timeout para dar tiempo al ScrollView de renderizar los mensajes antes de hacer scroll
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300); // Asegúrate de ajustar el tiempo si es necesario
  }, [chat_]);

  const sendMessage = async () => {
    socket?.emit('chat message', {
      token: await getToken(),
      message: newMessage,
      chatId: id,
    });
    setNewMessage("");
    // Scroll to the end after sending a message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // Pequeño retraso para asegurar que el mensaje se renderice antes de hacer scroll
  };

  const seeChat = async (idEvent: number) => {
    const fetchChat = async (idEvent: number) => {
      const data = await getChatData(idEvent, await getToken() ?? '');
      setChat_(
        data?.messages?.map((item: {
          ID_user: string;
          message: string;
          user: boolean;
        }) => ({
          sender: item.ID_user === '10' ? "Yo" : "Usuario",
          message: item.message,
          user: item.user
        })) || []
      );
    };
    await fetchChat(idEvent);
  };

  const { mode } = useScreenMode();

  return (
    <>
      <Stack.Screen options={{ headerTitle: `Chat ${id}` }} />
      <View style={[styles.container, { backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"] }]}>
        <View style={[styles.box, styles.box2, { backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"] }]}>
          <View style={[styles.mailPage, { backgroundColor: (mode === 'light') ? Colors.light["palette-3"] : Colors.dark["palette-3"] }]}>
            <ScrollView style={{ marginVertical: 20, marginTop: 0, paddingHorizontal: 20, marginBottom: 40 }} ref={scrollViewRef}>
              {chat_?.map((m, i) => (
                <Message sender={m.sender} message={m.message} isMine={m.user} key={i} />
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { backgroundColor: (mode === 'light') ? Colors.light["palette-4"] : Colors.dark["palette-4"] }]}
                onBlur={() => Keyboard.dismiss()}
                placeholder="Escribe un mensaje"
                onChange={(e) => setNewMessage(e.nativeEvent.text)}
                value={newMessage}
              />
              <TouchableOpacity style={[styles.sendButton, calcButtonBackground()]} onPress={sendMessage} disabled={newMessage.trim() === ''}>
                <StyledText xsmall bold mayus>
                  Enviar
                </StyledText>
              </TouchableOpacity>
            </View>
          </View>
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
  },
  mailPage: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  box2: {
    flex: 10,
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  input: {
    width: '80%',
    height: '100%',
    paddingLeft: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  sendButton: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
