import React from "react";
import "./style.css";

export const Panel = ({ content, width, height, top, bottom, left, right, transform }) => {
  return (
    <div className="panel" style={{ width: width, height: height, top: top, bottom: bottom, left: left, right: right, transform: transform }}>
      {content}
    </div>
  );
};
