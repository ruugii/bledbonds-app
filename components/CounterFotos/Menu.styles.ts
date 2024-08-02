import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 10,  // Ajusta según sea necesario
    width: '100%',
    height: 30,  // Ajusta la altura según sea necesario
    backgroundColor: 'transparent',
    borderRadius: 30,  // Ajusta según sea necesario
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    flex: 1,
    height: 30,
    width: '100%',  // Ajusta según sea necesario
    marginHorizontal: 2,
    backgroundColor: Colors.light['palette-11'],
    borderRadius: 30,  // Ajusta según sea necesario
  },
  selectedMenuItem: {
    backgroundColor: 'white',
  },
});

export default styles;
