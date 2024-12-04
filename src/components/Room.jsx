import React from "react";
// import { Socket } from "socket.io-client";

const RoomPage = ({ username, room, setUsername, setRoom, chatScreen, setChatScreen, socket }) => {

    const sendRoom = () => {
        socket.emit('room', room)
        setChatScreen(true)
    }
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[500px] bg-slate-600 flex flex-col justify-center space-y-3 p-3 rounded-xl">
        <h1 className="text-gray-300 my-3 font-bold text-xl text-center">
          Welcome To Chadors
        </h1>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          className="h-12 rounded-xl p-3 outline-none "
        />
        <input
          value={room}
          onChange={e => setRoom(e.target.value)}
          type="text"
          placeholder="Room ID"
          className="h-12  rounded-xl p-3 outline-none"
        />
        <div onClick={sendRoom} className="hover:opacity-50 border h-12 p-2 text-xl text-center rounded-xl bg-slate-400 outline-none text-white cursor-pointer">
          Let's Roll
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
