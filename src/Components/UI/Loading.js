import React from "react";
import "../../style/output.css";
const Loading = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
