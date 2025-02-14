import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (notification.showNotification) {
    return <div style={style}>{notification.notificationText}</div>;
  } else {
    return null;
  }
};

export default Notification;
