import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import roomService from "../services/rooms";

const RoomLobby = ({ room, username }) => {

  const [players, setPlayers] = useState([])

  useEffect(() => {
    // subscribe to the room
    roomService.subscribeToRoom(room.roomId, {
      onPlayersChange: (players) => {
        setPlayers(players);
        console.log(players);
      },
      onGameStart: () => {
        //navigate to the game page
        navigateTo(`/room/${room.roomId}/game`);
      }
    });

    // unsubscribe from the room when the component unmounts
    return () => {
      roomService.unsubscribeFromRoom(room.roomId);
    };
  } , [room.roomId]);

  //list all the players before the game starts



  const navigateTo = useNavigate();

  // handle leaving the room
  const handleLeaveRoom = () => {
    roomService.leaveRoom(room.roomId, username);
    
    //navigate back to the home page
    navigateTo("/");
  };


  // handle starting the game, switches to gametable and locks all the current players
  const handleStartGame = () => {
    
  };

  return (
    <div>
      <h1>Room: {room.roomId}</h1>
      <h2>Username: {username}</h2>
      <h3>Players:</h3>
      <ul>
        {players.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
      <button onClick={handleStartGame}>Start Game</button>
      <button onClick={handleLeaveRoom}>Leave Room</button>
    </div>
  );
}


export default RoomLobby;