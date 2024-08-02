interface RegisterInterface {
  key: string;
}

const menuEnabled = async (user: RegisterInterface) => {
  try {
    let API_URL = '';
    API_URL = 'https://api.bledbonds.es/api/v1';
    const resp = await fetch(`${API_URL}/masterdata/getAppOptionEnabled/${user.key}`, {
      method: 'GET',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
      },
    });
    if (!resp.ok) {
      console.log(resp);
      
      throw new Error('Network response was not ok');
    } else {
      const data = await resp.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default menuEnabled;
