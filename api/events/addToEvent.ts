const addToEvent = async (token: string, idEvent: string) => {
  try {
    let API_URL = 'https://api.bledbonds.es/api/v1';
    
    const resp = await fetch(`${API_URL}/events/newParticipants/${idEvent}`, {
      method: 'POST',
      headers: {
        'x-api-key': '6d83d4496c0010950eb2f3a0db79004c',
        'x-user-key': token
      }
    });
    if (!resp.ok) {
      console.log(resp);
      console.log(resp.json());
      
      throw new Error('Network response was not ok');
    } else {
      const data = await resp.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export default addToEvent;
