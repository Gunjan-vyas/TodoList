import React from "react";
const Status = {
  success: "success",
  error: "error",
};
const getBgColorbasedOnStatus = (status) => {
  switch (status) {
    case Status.success:
      return "green";
    case Status.error:
      return "red";
    default:
      return "blue";
  }
};
const Toast = ({ toastData }) => {
  if (!toastData) return;
  const { status, message } = toastData;
  return <div style={{ backgroundColor: getBgColorbasedOnStatus(status) }}>{message}</div>;
};

export default Toast;
