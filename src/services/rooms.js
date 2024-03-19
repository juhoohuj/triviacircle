import axios from 'axios';
const baseUrl = 'http://localhost:3000'; // Add http:// protocol specifier

const joinRoom = async (roomId, username) => {
  try {
    const response = await axios.post(`${baseUrl}/joinroom`, {
      roomId,
      username,
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('There was an error!', error);
    throw error; // Rethrow error for caller to handle if necessary
  }
}

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createRoom = async (username) => {
  const response = await axios.post(`${baseUrl}/createroom`, {
    username,
  });
  return response.data;
}

const getRoom = async (roomCode) => {
  const response = await axios.get(`/getroom?roomCode=${roomCode}`);
  return response.data;
}

export default {
  joinRoom,
  createRoom,
  getRoom,
};
