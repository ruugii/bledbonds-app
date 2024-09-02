import { StyleSheet } from "react-native";
import Constants from "expo-constants";

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
    // borderBottomWidth: 1,
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
  },
  selected: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})

export default styles;