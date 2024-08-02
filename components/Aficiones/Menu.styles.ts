import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Colors } from "../../constants/Colors";

const styles = StyleSheet.create({
  box: {
    flex: 1,
    width: '100%',
  },
  box1: {
    flex: 1,
    width: '100%',
  },
  menu: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    maxHeight: '20%',
  },
  menuItem: {
    margin: 10,
    backgroundColor: Colors.light["palette-1"],
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  textStyles: {
    fontSize: 20,
    textTransform: 'capitalize'
  },
  selected: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})

export default styles;