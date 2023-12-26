import { useSelector } from "react-redux";
import { ProgressBar } from "../progressBar";
import { Nave } from "../nave";
import "./style.css";

export const FichaNave = () => {
  const ship = useSelector((state) => state.aplicationConfig.ship);
  return (
    <div className="flex100">
      <div className="text-white p-2 w-50">
        <div className="flex100 w-100" style={{ justifyContent: "space-between" }}>
          <label className="font-bold">{ship.name}</label>
          <label className="font-bold shipLevel">{ship.nivel}</label>
        </div>
        <div>
          <label className="font-light">Combustible</label> <ProgressBar value={ship.combustible} color={"#02a0a6"} />
        </div>
        <div>
          <label className="font-light">Almacenaje</label>
          <ProgressBar
            value={
              ship.almacenaje > 0
                ? ship.almacenaje.reduce((acumulador, objeto) => {
                    return acumulador + objeto["quantity"];
                  }, 0)
                : 0
            }
            color={"#227e00"}
          />
        </div>
        <div>
          <label className="font-light">Escudos</label> <ProgressBar value={ship.escudos} color={"#008bff"} />
        </div>
        <div>
          <label className="font-light">Armamento</label> <ProgressBar value={ship.armamento} color={"#970000"} />
        </div>
      </div>
      <Nave image={ship.icon} />
    </div>
  );
};
