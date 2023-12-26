import React from "react";
import { useSelector } from "react-redux";

export const Chat = () => {
  const userConfig = useSelector((state) => state.aplicationConfig.userConfig);

  const getLineStyle = (type) => {
    let color = "white";
    switch (type) {
      case "ship":
        color = "white";
        break;
      case "opponent":
        color = "orangered";
        break;
      case "drop":
        color = "goldenrod";
        break;
      case "system":
        color = "#008bff";
        break;
      case "world":
        color = "#008600";
        break;
      default:
        break;
    }
    return color;
  };
  return (
    <div className="p-2 scroll-y">
      {userConfig.logs.length > 0 &&
        userConfig.logs.toReversed().map((e, i) => {
          return (
            <div className={"font-09"} style={{ color: getLineStyle(e.type) }}>
              {e.type === "opponent" && e.name}
              <label>{e.text1}</label>
              <b>{e.quantity}</b>
              <label>{e.text2}</label>
            </div>
          );
        })}
    </div>
  );
};
