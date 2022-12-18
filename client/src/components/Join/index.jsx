import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    room: "",
  });

  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const link = `/chat?name=${formData.name}&room=${formData.room}`;
  return (
    <form className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            className="joinInput"
            name="name"
            value={formData.name}
            onChange={formDataHandler}
            placeholder="name"
          />
        </div>
        <div>
          <input
            placeholder="room"
            type="text"
            className="joinInput mt-20"
            name="room"
            value={formData.room}
            onChange={formDataHandler}
          />
        </div>
        <Link
          onClick={(e) =>
            !formData.name || !formData.room ? e.preventDefault() : null
          }
          to={link}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </form>
  );
};

export default Join;
