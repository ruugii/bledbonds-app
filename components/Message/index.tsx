import { View } from "react-native";
import { Colors } from "../../constants/Colors";
import StyledText from "../StyledText";
import useScreenMode from "../../utilities/screenMode";

interface MessageProps {
  readonly sender: string;
  readonly message: string;
  readonly isMine: boolean;
}


export default function Message({ sender, message, isMine }: MessageProps) {

  const calcBackground = () => {
    // isMine ? mode==='light'? Colors.light["palette-5"] : Colors.dark["palette-5"] : mode==='light'? Colors.light["palette-4"] : Colors.dark["palette-4"]
    if (isMine && mode === 'light') {
      return Colors.light["palette-5"];
    } else if (isMine && mode === 'dark') {
      return Colors.dark["palette-5"];
    } else if (mode === 'light') {
      return Colors.light["palette-4"];
    } else if (mode === 'dark') {
      return Colors.dark["palette-4"];
    }
  }

  const { mode } = useScreenMode()

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
        backgroundColor: calcBackground()
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
