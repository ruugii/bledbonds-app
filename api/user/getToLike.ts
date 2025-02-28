interface RegisterInterface {
  token: string;
}

const getToLike = async (user: RegisterInterface) => {
  try {
    let API_URL = '';
    API_URL = 'https://api.bledbonds.es/api/v1';
    const resp = await fetch(`${API_URL}/users/get/toLike`, {
      method: 'GET',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
        'user-token': user.token,
      },
    });
    if (!resp.ok) {
      if (resp.status === 404) {
        const data = await resp.json();
        return {
          status: '-0001',
          data
        };
      } else {
        throw new Error('Network response was not ok');
      }
    } else {
      const data = await resp.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default getToLike;
