import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ showNotification }) => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (showNotification) {
    return <div style={style}>{notification}</div>;
  } else {
    return null;
  }
};

export default Notification;
