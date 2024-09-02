import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/Colors";
import useScreenMode from "../../utilities/screenMode";

interface InputProps {
  readonly valueError: boolean;
  readonly setValueError: (value: string) => void;
  readonly value: string;
  readonly placeholder: string;
}

export default function Input(props: InputProps) {

  const { mode } = useScreenMode()

  return (
    <TextInput
      style={[
        styles.imput, 
        styles.imputCode, 
        props.valueError ? { 
          borderColor: 'red' 
        } : { 
          borderColor: mode==='light' ? Colors.light["palette-6"] : Colors.dark["palette-6"] 
        }, {
          color: mode==='light' ? Colors.light["palette-1"] : Colors.dark["palette-1"]
        }]}
      onChangeText={props.setValueError}
      value={props.value}
      placeholder={props.placeholder}
    />
  )
}

const styles = StyleSheet.create({
  imput: {
    borderWidth: 1,
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
  box: {
    flex: 1,
  },
  box1: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    flex: 0.5,
  },
});
