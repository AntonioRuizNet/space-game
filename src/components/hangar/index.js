import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatShip, setMode, updateUbication, addLog } from "./../../reducers/userConfigSlice";
import { universe } from "./../../helpers/worldGenerator";

export const Hangar = () => {
  const dispatch = useDispatch();
  const userConfig = useSelector((state) => state.aplicationConfig);
  const [seconds, setSeconds] = useState(0);
  const [shipReady, setShipReady] = useState(false);

  //TRIGGERS
  useEffect(() => {
    //1s = combustible+3
    if (seconds % 1 === 0 && userConfig.ship.combustible < 100)
      dispatch(updateStatShip({ key: "combustible", data: userConfig.ship.combustible + 3 > 100 ? 100 : userConfig.ship.combustible + 3 }));

    //1s = escudos+2
    if (seconds % 1 === 0 && userConfig.ship.escudos < 100)
      dispatch(updateStatShip({ key: "escudos", data: userConfig.ship.escudos + 2 > 100 ? 100 : userConfig.ship.escudos + 2 }));

    if (userConfig.ship.combustible > 99 && userConfig.ship.escudos > 99) {
      setShipReady(true);
      dispatch(addLog({ name: "", text1: "La nave ya ha sido reparada, esperamos nuevas órdenes.", quantity: "", text2: "", type: "world" }));
    } else setShipReady(false);
  }, [seconds]);

  //TIME COUNTER
  useEffect(() => {
    dispatch(addLog({ name: "", text1: "Hogar, dulce hogar. Le avisaré cuando la nave esté reparada.", quantity: "", text2: "", type: "world" }));
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
    <div className="text-white center font-20 flash-animation">Reparando nave</div>
  ) : (
    <div className="text-white center font-20">Sistemas reparados</div>
  );
};
