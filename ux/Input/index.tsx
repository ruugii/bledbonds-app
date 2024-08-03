import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/Colors";

interface InputProps {
  valueError: boolean;
  setValueError: (value: string) => void;
  value: string;
  placeholder: string;
}

export default function Input(props: InputProps) {
  return (
    <TextInput
      style={[styles.imput, styles.imputCode, props.valueError ? { borderColor: 'red' } : { borderColor: Colors.light["palette-6"] }]}
      onChangeText={props.setValueError}
      value={props.value}
      placeholder={props.placeholder}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.light["palette-3"],
    flexDirection: 'column',
    paddingHorizontal: 20,
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
    justifyContent: 'space-between',
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
