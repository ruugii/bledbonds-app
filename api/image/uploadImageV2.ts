export default async function uploadImageV2(image: File | FormData) {
  try {
    const API_URL = 'https://api.bledbonds.es/api/v1';
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch(`${API_URL}/img/upload`, {
      method: 'POST',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during image upload:', error);
  }
}
