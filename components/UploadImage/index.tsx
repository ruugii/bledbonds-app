import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import StyledText from "../StyledText";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import useScreenMode from "../../utilities/screenMode";
import { uploadImageV2 } from "../../api/image/uploadImageV2";

interface fotoInterface {
  uri: string;
  type: string;
  name: string;
}

interface UploadImageProps {
  readonly setPhoto: (aux: fotoInterface) => void;
}

export default function UploadImage({ setPhoto }: UploadImageProps) {
  const [photoURI, setPhotoURI] = useState<string | null>(null);
  const { mode } = useScreenMode();
  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Cannot access gallery without permissions.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]) {
      const selectedImage = result.assets[0];
      setPhotoURI(selectedImage.uri);
      setPhoto({
        uri: selectedImage.uri,
        type: selectedImage.mimeType ?? 'image/jpeg',
        name: selectedImage.fileName ?? 'image.jpg',
      })
    }
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
