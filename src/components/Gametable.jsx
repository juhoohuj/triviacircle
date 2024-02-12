import React, { useState } from 'react';
import Playerlist from './Playerlist';


//pelipöytä
const Gametable = () => {
  const testUser = {
    id: 1,
    name: 'Test User',
    score: 0,
    active : true,
    answerQue : 1
  }

  const testUser2 = {
    id: 2,
    name: 'Test User 2',
    score: 4,
    active : true,
    answerQue : 2
  }

  const [players, setPlayers] = useState([testUser, testUser2])

  const addPlayer = (player) => {
    setPlayers([...players, player])
  }

  function changeQue() {
    let newPlayers = players.map((player) => {
      if (player.active) {
        player.answerQue = player.answerQue - 1
      }
      if(player.answerQue === 0){
        player.answerQue = players.length
      }
      return player
    })
    setPlayers(newPlayers)
  }


  return (
    <div>
      <h1>Game Table</h1>
      <Playerlist players={players} />
    </div>
  )

}

export default Gametable;