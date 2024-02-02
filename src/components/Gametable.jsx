import useState from 'react';

const Gametable = () => {

  const testUser = {
    name: 'Test User',
    score: 0,
    active : true,
    //answerPos : 0
  }

  const testUser2 = {
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
      <PlayerForm addPlayer={addPlayer} />
      <PlayerList players={players} />
    </div>
  )

}