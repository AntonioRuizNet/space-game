import { Globe } from "../globe";
import { ProgressBar } from "../progressBar";

export const FichaUbicacion = ({ data }) => {
  return (
    <div className="flex100">
      <Globe image={data.icon} />
      <div className="text-white p-2 w-50">
        <div>
          <label className="font-bold">{data.name}</label>
        </div>
        <div>
          <label className="font-light">Temperatura:</label> <ProgressBar value={data.temperatura} color={"#e89500"} />
        </div>
        <div>
          <label className="font-light">Gravedad:</label> <ProgressBar value={data.gravedad} color={"#e89500"} />
        </div>
        <div>
          <label className="font-light">Porcentaje terrestre:</label> <ProgressBar value={data.porcentajeTierra} color={"#e89500"} />
        </div>
        <div>
          <label className="font-light">Tamaño:</label> <ProgressBar value={data.size} color={"#e89500"} />
        </div>
      </div>
    </div>
  );
};
