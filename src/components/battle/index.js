import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatShip, addLog } from "./../../reducers/userConfigSlice";
//Components
import { ProgressBar } from "../progressBar";
//Functions
import { getRandomInt } from "./../../helpers/functions";
import { obtenerMaterialPorRareza } from "./../../helpers/materiales";

export const Battle = ({ opponent, setOpponent }) => {
  const dispatch = useDispatch();
  const userConfig = useSelector((state) => state.aplicationConfig);
  const [opponentStats, setOpponentStats] = useState(opponent);
  const [seconds, setSeconds] = useState(0);

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
    const handicapDamage = getRandomInt(2, 6);
    const opponentDamage = getRandomInt(1, 3);
    if (seconds > 1 && seconds % 1 === 0 && userConfig.ship.escudos > 0 && opponentStats.escudos > 0) {
      dispatch(updateStatShip({ key: "escudos", data: userConfig.ship.escudos - opponentDamage }));
      let newOpponentEscudo = opponentStats.escudos - handicapDamage;
      setOpponentStats({ ...opponentStats, escudos: newOpponentEscudo > 0 ? newOpponentEscudo : 0 });
      dispatch(addLog({ name: opponentStats.name, text1: " te ha causado ", quantity: opponentDamage, text2: " de daño.", type: "opponent" }));
      dispatch(addLog({ name: "", text1: "Has causado ", quantity: handicapDamage, text2: " de daño.", type: "ship" }));
    } else {
      if (userConfig.ship.escudos < 1 || opponentStats.escudos < 1) {
        setTimeout(() => {
          setOpponent(null);
        }, 8000);
      }
    }
  }, [seconds]);

  useEffect(() => {
    if (opponentStats.escudos < 1) {
      // Drop
      let drop = obtenerMaterialPorRareza();
      let dropQuantity = getRandomInt(1, 2);
      dispatch(addLog({ name: "", text1: "Has obtenido ", quantity: dropQuantity, text2: " " + drop.name, type: "drop" }));
      addDrop(drop, dropQuantity);
      dispatch(updateStatShip({ key: "almacenaje", data: addDrop(drop, dropQuantity) }));

      // Experiencia + Nivel
      let experiencia = getRandomInt(10, 15);
      dispatch(addLog({ name: "", text1: "Has obtenido ", quantity: experiencia, text2: " puntos de experiencia.", type: "drop" }));
      let nuevaExperiencia = userConfig.ship.experiencia + experiencia;
      if (nuevaExperiencia > 100) {
        nuevaExperiencia = nuevaExperiencia - 100;
        dispatch(updateStatShip({ key: "experiencia", data: nuevaExperiencia }));
        dispatch(updateStatShip({ key: "nivel", data: parseInt(userConfig.ship.nivel) + 1 }));
      } else {
        dispatch(updateStatShip({ key: "experiencia", data: nuevaExperiencia }));
      }

      // Log fin batalla
      dispatch(
        addLog({
          name: userConfig.ship.name,
          text1: "Comandate, la batalla terminó, preparamos motores de salto.",
          quantity: "",
          text2: "",
          type: "system",
        })
      );
    }
  }, [opponentStats]);

  //TIME COUNTER
  useEffect(() => {
    dispatch(
      addLog({
        name: userConfig.ship.name,
        text1: "¡Comandate, hemos encontrado una nave hostil! ¡Desplegar escudos!",
        quantity: "",
        text2: "",
        type: "system",
      })
    );
    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-100 p-3">
      <div className="flex100">
        <div className="w-50">
          <img alt={userConfig.ship.name} src={process.env.PUBLIC_URL + "/" + userConfig.ship.icon} width="200px" />
          <div className="text-white" style={{ paddingRight: "4%" }}>
            <div className="font-bold">{userConfig.ship.name}</div>
            <div>
              <label className="font-light">Escudos</label> <ProgressBar value={userConfig.ship.escudos} color={"#008bff"} />
            </div>
            <div>
              <label className="font-light">Armamento</label> <ProgressBar value={userConfig.ship.armamento} color={"#970000"} />
            </div>
          </div>
        </div>
        <div className="w-50 right">
          <img alt={opponentStats.name} src={process.env.PUBLIC_URL + "/" + opponentStats.icon} width="200px" />
          <div className="text-white" style={{ paddingLeft: "4%" }}>
            <div className="font-bold">{opponentStats.name}</div>
            <div>
              <label className="font-light">Escudos</label> <ProgressBar value={opponentStats.escudos} color={"#008bff"} />
            </div>
            <div>
              <label className="font-light">Armamento</label> <ProgressBar value={opponentStats.armamento} color={"#970000"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
