import { View } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../StyledText";

interface MessageProps {
  sender: string;
  message: string;
  isMine: boolean;
}


export default function Message({ sender, message, isMine }: MessageProps) {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: `${isMine ? 'flex-end' : 'flex-start'}`,
      marginVertical: 8,
    }}>
      <View style={{
        maxWidth: 320,
        padding: 12,
        borderRadius: 8,
        borderBottomRightRadius: isMine ? 0 : 8,
        borderBottomLeftRadius: isMine ? 8 : 0,
        backgroundColor: isMine ? Colors.light["palette-5"] : Colors.light["palette-4"],
      }}>
        <View style={{
          marginBottom: 4,
        }}>
          <StyledText xsmall>
            {isMine ? 'Yo' : sender}
          </StyledText>
        </View>
        <View>
          {isMine ? (
            <StyledText litle right>
              {message}
            </StyledText>
          ) : (
            <StyledText litle left>
              {message}
            </StyledText>
          )}
        </View>
      </View>
    </View>
  );
}
