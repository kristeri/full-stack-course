import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const state = useSelector((state) => state.notification);
  if (state.message === null) {
    return null;
  }

  if (state.error === true) {
    return <div className="error">{state.message}</div>;
  }

  return <div className="message">{state.message}</div>;
};

export default Notification;
