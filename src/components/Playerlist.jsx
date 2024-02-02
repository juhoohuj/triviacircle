

const Playerlist = ({ players }) => {

  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map((player, index) => {
          return <li key={index}>{player}</li>
        })}
      </ul>
    </div>
  )
}

export default Playerlist;