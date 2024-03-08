import axios from 'axios';


const joinRoom = async (roomId, username) => {
  const response = await axios.post('/joinroom', {
    roomId,
    username,
  });
  return response.data;
}

const createRoom = async (username) => {
  const response = await axios.post('/createroom', {
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
