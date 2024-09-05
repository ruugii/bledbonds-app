interface likeInterface {
  token: string;
  id: string;
}

const likeActionAPI = async (prop: likeInterface) => {
  try {
    let API_URL = 'https://api.bledbonds.es/api/v1';
    
    const resp = await fetch(`${API_URL}/actions/like`, {
      method: 'POST',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
        'user-token': prop.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUser: prop.id,
        action: '1',
      })
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

export default likeActionAPI;
