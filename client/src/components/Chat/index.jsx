import React, { useState, useEffect } from "react";

import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";

import io from "socket.io-client";

let socket = null;
const socketParameters = ["192.168.1.38:5000", { transports: ["websocket"] }];
const Chat = () => {
  // hooks
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // bindings

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(...socketParameters);
    socket.on("connection");
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, ({ error }) => {
      console.log(error);
      error && alert(error);
    });

    console.log(socket);
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (res) => {
      setMessageList((prev) => [...prev, res.text]);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div>
      <h1>CHat</h1>
      <ul>
        {messageList?.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Chat;
