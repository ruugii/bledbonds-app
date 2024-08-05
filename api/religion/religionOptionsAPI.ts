const religionOptionsAPI = async () => {
  try {
    let API_URL = '';
    API_URL = 'https://api.bledbonds.es/api/v1';
    const resp = await fetch(`${API_URL}/religion`, {
      method: 'GET',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
      },
    });
    if (!resp.ok) {
      throw new Error('Network response was not ok');
    } else {
      const data = await resp.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default religionOptionsAPI;
