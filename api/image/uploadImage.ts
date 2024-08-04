const uploadImage = async (image: File | null | undefined | FormData) => {
  try {
    let API_URL = '';
    API_URL = 'https://api.bledbonds.es/api/v1';

    let formData = new FormData();
    if (!(image instanceof FormData)) {
      formData.append('image', image || '');
    } else if (image instanceof FormData) {
      formData = image;
    }

    const resp = await fetch(`${API_URL}/img/upload`, {
      method: 'POST',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
      },
      body: formData
    });
    if (!resp.ok) {
      throw new Error('Network response was not ok');
    } else {
      const data = await resp.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default uploadImage;