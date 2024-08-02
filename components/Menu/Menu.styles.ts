import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Colors } from "../../constants/Colors";

const styles = StyleSheet.create({
  private: {
    position: 'relative',
    bottom: 0,
    left: 0,
  },
  box: {
    flex: 1,
  },
  box1: {
    flex: 1,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.light["palette-3"],
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.light["palette-11"],
    width: '100%',
  },
  menuMargin : {
    marginTop: Constants.statusBarHeight,
  },
  menuItem: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontSize: 20,
    // color: Colors.light["palette-11"],
    // backgroundColor: Colors.light["palette-3"],
  },
  selected: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    // color: Colors.light["palette-9"]
  }
})

export default styles;