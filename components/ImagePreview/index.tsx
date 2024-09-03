import { Image, Text, View } from "react-native";

interface ImagePreviewProps {
  readonly photo: string;
}

export default function ImagePreview(props: ImagePreviewProps) {
  return (
    <View>
      <Image
        source={{ uri: props.photo }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 10,
        }}
      />
    </View>
  );
}