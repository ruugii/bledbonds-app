const zodiacOptionsAPI = async () => {
  const API_URL = 'https://api.bledbonds.es/api/v1';
  return await fetch(`${API_URL}/zodiac`, {
    method: 'GET',
    headers: {
      'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
    },
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

const zodiacOptionsAPIOld = async () => {
  try {
    let API_URL = '';
    API_URL = 'https://api.bledbonds.es/api/v1';
    const resp = await fetch(`${API_URL}/zodiac`, {
      method: 'GET',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
      },
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

export default zodiacOptionsAPI;
