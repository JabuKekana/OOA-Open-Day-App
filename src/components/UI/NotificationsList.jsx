import React from "react";
import NotificationCard from "./NotificationCard";

const NotificationsList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <NotificationCard item={item} key={index} />
      ))}
    </>
  );
};

export default NotificationsList;


