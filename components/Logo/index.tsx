import { Image, View } from "react-native";

export default function Logo() {
  return (
    <View style={{
      margin: 5,
    }}>
      <Image
        source={require('../../assets/bledBonds_logo_app.png')}
        style={{
          height: 40,
          resizeMode: 'contain',
        }}
      />
    </View>
  )
}