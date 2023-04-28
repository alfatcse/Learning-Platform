import React from "react";

const Error = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="block text-sm ">{message}</span>
    </div>
  );
};

export default Error;
