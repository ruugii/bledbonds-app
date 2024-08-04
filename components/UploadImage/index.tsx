import React from "react";
import { TouchableOpacity, View, Image, Alert } from "react-native";
import StyledText from "../StyledText";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from 'expo-image-picker';

interface UploadImageProps {
  photo: any;
  setPhoto: any;
}

export default function UploadImage(props: UploadImageProps) {
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permiso denegado", "No se puede acceder a la galería sin permisos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      props.setPhoto(result.assets[0]);
    }
  };

  return (
    <TouchableOpacity 
      style={{
        height: 100,
        width: 100,
        borderRadius: 10,
        backgroundColor: Colors.light['palette-1'],
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={handleChoosePhoto}
    >
      {props.photo ? (
        <Image
          source={{ uri: props.photo.uri }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 10,
          }}
        />
      ) : (
        <StyledText xsmall bold center> 
          Imagen de perfil
        </StyledText>
      )}
    </TouchableOpacity>
  );
}
