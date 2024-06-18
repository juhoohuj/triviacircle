//pelaajien haku ja listaus
const Playerlist = ({ players }) => {
	return (
		<div>
			<h2>Players</h2>
			<ul>
				{players.map((player) => (
					<li key={player.id}>{player.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Playerlist;
