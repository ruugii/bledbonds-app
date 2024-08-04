import { Pressable, Text, View } from "react-native";

interface RadioInterface {
  checked: boolean;
  onPress: () => void;
  style?: {}
}

export default function Radio(props: RadioInterface) {
  return (
    <Pressable onPress={props.onPress} style={props.style}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderColor: props.checked ? 'green' : 'white',
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: props.checked ? 'green' : 'transparent',
      }}>
        {props.checked ? <Text style={{color: 'white'}}>✓</Text> : null}
      </View>
    </Pressable>
  )
}