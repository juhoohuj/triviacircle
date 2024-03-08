import roomService from "../services/rooms"
import { useState } from "react"


const Home = () => {
    const [roomCode, setRoomCode] = useState("")
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState(null)

    const handleJoinRoom = async () => {
        const room = await roomService.joinRoom(roomCode, username)
        setRoom(room)
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Enter your name: </p>
            <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)} />

            <p>Join to an existing game: </p>
            <input type="text" placeholder="Room Code..." onChange={(e) => setRoomCode(e.target.value)} />
            <button onClick={handleJoinRoom}>Join Game</button>

            <p>Create a new game: </p>
            <button onClick={async () => {
                const room = await roomService.createRoom(username)
                setRoom(room)
            }}>Create Game</button>

        </div>
    )
}

export default Home

