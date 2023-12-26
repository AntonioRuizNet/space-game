import React from "react";
import { useSelector } from "react-redux";
import "./style.css";

export const Inventario = () => {
  const almacenaje = useSelector((state) => state.aplicationConfig.ship.almacenaje);
  return (
    <div className="p-2 flex100 wrap scroll-y">
      {almacenaje.map((item) => {
        return (
          <div className="itemInventory" style={{ backgroundImage: "url(" + item.icon + ")" }}>
            <div className="itemInventoryQuantity text-white font-09">
              <label>{item.quantity}</label>
            </div>
            <div className="itemInventoryName text-white font-065">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};
