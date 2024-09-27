interface RegisterInterface {
  token: string;
  id_find: string;
  id_orientation: string;
  id_status: string;
  bio: string;
  height?: string;
  studyPlace?: string;
  you_work?: string;
  charge_work?: string;
  enterprise?: string;
  drink?: string;
  photo?: string;
  language?: string[];
  id_zodiac?: string;
  mascotas?: string;
  id_religion?: string;
  lat?: number;
  lon?: number;
}

const updateUserAPI = async (user: RegisterInterface) => {
  try {
    let API_URL = '';
    API_URL = 'https://api.bledbonds.es/api/v1';
    const resp = await fetch(`${API_URL}/users/update`, {
      method: 'PUT',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
        'user-token': user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
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

export default updateUserAPI;
