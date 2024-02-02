import useState from 'react';

const Gametable = () => {
  const [players, setPlayers] = useState([])

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