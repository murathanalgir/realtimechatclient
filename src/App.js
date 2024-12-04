import { useState } from "react";
import RoomPage from "./components/Room";
import io from "socket.io-client";
import Chat from './components/Chat';
import './App.css'

const socket = io.connect("http://localhost:3131");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="main">
    {
      !chatScreen ?
      <RoomPage username={username} room={room} setUsername={setUsername} setRoom={setRoom} chatScreen={chatScreen} setChatScreen={setChatScreen} socket={socket}/>
      : <Chat username={username} room={room} socket={socket} />
    }

    </div>
  )
  }

export default App;
