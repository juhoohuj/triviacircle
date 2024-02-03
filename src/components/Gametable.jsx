import React, { useState } from 'react';
import Playerlist from './Playerlist';

const Gametable = () => {
  const testUser = {
    id: 1,
    name: 'Test User',
    score: 0,
    active : true,
    //answerPos : 0
  }

  const testUser2 = {
    id: 2,
    name: 'Test User 2',
    score: 4,
    active : true,
    //answerPos : 0
  }

  const [players, setPlayers] = useState([testUser, testUser2])

  const addPlayer = (player) => {
    setPlayers([...players, player])
  }

  return (
    <div>
      <h1>Game Table</h1>
      <Playerlist players={players} />
    </div>
  )

}

export default Gametable;