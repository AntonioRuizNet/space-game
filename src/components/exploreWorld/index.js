import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatShip, setMode, updateUbication, addLog } from "../../reducers/userConfigSlice";
import { universe } from "../../helpers/worldGenerator";
//Functions
import { getRandomInt } from "./../../helpers/functions";
import { obtenerMaterialPorRareza } from "./../../helpers/materiales";

export const ExploreWorld = () => {
  const dispatch = useDispatch();
  const userConfig = useSelector((state) => state.aplicationConfig);
  const [seconds, setSeconds] = useState(0);
  const [shipReady, setShipReady] = useState(false);

  const addDrop = (drop, quantity) => {
    let almacenaje = JSON.parse(JSON.stringify(userConfig.ship.almacenaje));
    let almacenajeUpdated = almacenaje;
    let dropFound = almacenaje.filter((f) => f.id === drop.id);
    if (dropFound.length === 0) {
      almacenajeUpdated.push({ ...drop, quantity: quantity });
    } else {
      almacenajeUpdated = almacenaje.map((item) => {
        if (item.id !== drop.id) return item;
        else {
          item["quantity"] += quantity;
          return item;
        }
      });
    }
    console.log(almacenajeUpdated);
    return almacenajeUpdated;
  };

  //TRIGGERS
  useEffect(() => {
    //12s = drop
    if (seconds > 1 && seconds % 20 === 0) {
      // Drop
      let drop = obtenerMaterialPorRareza();
      let dropQuantity = getRandomInt(1, 2);
      dispatch(addLog({ name: "", text1: "Has obtenido ", quantity: dropQuantity, text2: " " + drop.name, type: "drop" }));
      addDrop(drop, dropQuantity);
      dispatch(updateStatShip({ key: "almacenaje", data: addDrop(drop, dropQuantity) }));
    }

    //Exploración completada
    if (seconds === 45) {
      dispatch(addLog({ name: "", text1: "Exploración finalizada.", quantity: "", text2: "", type: "system" }));
      setShipReady(true);
      dispatch(setMode("exploring"));
      dispatch(updateUbication(universe));
    } else setShipReady(false);
  }, [seconds]);

  //TIME COUNTER
  useEffect(() => {
    dispatch(addLog({ name: "", text1: "Comandante, hemos llegado a " + userConfig.ubication.name, quantity: "", text2: "", type: "system" }));
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const init = () => {};

  useEffect(() => {
    init();
  }, []);

  return !shipReady ? (
    <div className="text-white center font-20 flash-animation">Recolectando</div>
  ) : (
    <div className="text-white center font-20">Exploración completada</div>
  );
};
