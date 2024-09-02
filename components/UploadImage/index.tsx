import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import StyledText from "../StyledText";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import useScreenMode from "../../utilities/screenMode";

interface UploadImageProps {
  readonly photo: File | null;
  readonly setPhoto: (photo: File | null) => void;
  photoAux: any;
  setPhotoAux: (photoAux: any) => void;
}

export default function UploadImage({ photo, setPhoto, setPhotoAux }: UploadImageProps) {

  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const { mode } = useScreenMode();

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permiso denegado", "No se puede acceder a la galería sin permisos.");
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setPhotoURI(
          result.assets[0].uri
        )
        
        const file = await uriToFile(
          result.assets[0].uri,
          result.assets[0].fileName || 'image.jpg',
          result.assets[0].type || 'image/jpeg'
        );
        setPhotoAux(file)
        setPhoto(file);
      }
    };
  }

  const uriToFile = async (uri: string, fileName: string, mimeType: string): Promise<File> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType, lastModified: Date.now() });
  };

  return (
    <TouchableOpacity
      style={{
        height: 100,
        width: 100,
        borderRadius: 10,
        backgroundColor: mode === 'light' ? Colors.light['palette-1'] : Colors.dark['palette-1'],
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={handleChoosePhoto}
    >
      {photoURI ? (
        <Image
          source={{ uri: photoURI }}
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
