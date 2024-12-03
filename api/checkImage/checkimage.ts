interface checkImageInterface {
  uri: string;
}

const checkImage = async (checkImage: checkImageInterface) => {
  try {
    const data = await fetch(checkImage.uri);
  } catch (error) {
    console.error(error);
  }
}

export default checkImage;
