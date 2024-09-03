import axios from 'axios';

export async function uploadImageV2(uri: string, type?: string, name?: string) {
  try {
    const API_URL = 'https://api.bledbonds.es/api/v1';
    const data = new FormData();
    data.append('image', {
      uri,
      type: type ?? 'image/png',
      name: name ?? 'image.png',
    });

    const response = await axios.post(
      `${API_URL}/img/upload`,
      data,
      {
        headers: {
          'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: () => data,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to upload image: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // re-throw the error after logging it
  }
}
