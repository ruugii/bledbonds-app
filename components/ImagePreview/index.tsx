import { Image, ImageBackground, Modal, Text, TouchableOpacity, View } from "react-native";
import StyledText from "../StyledText";
import { useState } from "react";
import CloseIcon from "../../Icons/Close";

interface ImagePreviewProps {
  readonly photo: string;
  readonly onDelete: () => void;
}

export default function ImagePreview(props: ImagePreviewProps) {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleDelete = () => {
    props.onDelete();
  }

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            setModalOpen(!modalOpen);
          }}
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
          }}
        >
          <Image
            source={{ uri: props.photo }}
            style={{
              height: 100,
              width: '100%',
              borderRadius: 10,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          onPress={() => handleDelete()}
        >
          <StyledText litle center>
            ELIMINAR
          </StyledText>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        visible={modalOpen}
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center', // Opcional, si quieres centrar el contenido
            alignItems: 'center', // Opcional, si quieres centrar el contenido
            zIndex: 1000, // Asegura que el modal esté por encima de otros elementos
          }}
        >
          <View style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              height: '95%',
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: 10,
                  zIndex: 1001,
                  backgroundColor: 'white',
                }}
                onPress={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                <CloseIcon />
              </TouchableOpacity>
              <ImageBackground
                source={{ uri: props.photo }}
                style={{
                  height: '100%',
                  width: '100%',
                  justifyContent: 'center',
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}