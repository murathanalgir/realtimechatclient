import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  console.log("messageList", messageList);
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[800px] bg-slate-600 relative ">
        <div className="w-full h-16 bg-gray-950 flex items-center">
          <div className="w-12 h-12 bg-white rounded-full m-2"></div> <div className="text-white text-xl">Welcome to {room}</div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto ">
          {messageList &&
            messageList.map((msg, i) => (
              <>
                <div className={`${username === msg.username ? 'flex justify-end': ''}`}>
                  <div className={`${username === msg.username ? 'bg-green-500': 'bg-blue-400'} w-1/2 h-12  text-white text-sm m-2 p-2 rounded-xl rounded-br-none`}>
                    <div className="">{msg.message}</div>
                    <div className="w-full flex justify-end text-xs">
                      {msg.username}
                    </div>
                  </div>
                </div>
              </>
            ))}

        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 rounded-xl p-3 outline-none bg-gray-600 text-white text-xl h-12 border border-gray-600"
            type="text"
            placeholder="Message"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                  sendMessage();
              }}
          />
          
          <button
            onClick={sendMessage}
            className="w-1/4 text-black bg-white h-12 hover:opacity-60 text-xl"
          >
            Send!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
