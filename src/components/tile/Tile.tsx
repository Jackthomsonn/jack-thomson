import useSWR from "swr";
import "./Tile.css";

type HomeTotalsResponse = {
  carbonTotal: number;
  consumptionTotal: number;
};

type TileProps = {
  type: keyof HomeTotalsResponse;
  title: string;
} & React.PropsWithChildren;

export const Tile = ({ type, title }: TileProps) => {
  const isDev = process.env.NODE_ENV === "development";
  const { data } = useSWR<HomeTotalsResponse>(
    isDev
      ? "http://localhost:8080/getTotalsForHome"
      : "https://europe-west1-home-monitor-373013.cloudfunctions.net/GetTotalsForHome"
  );

  return (
    <>
      <div className="tile_container">
        <div className={`tile_container__tile-${type}`}>
          <div className="tile_container__tile__title">{title}</div>

          <div className="tile_container__tile__value">{data?.[type]}</div>
        </div>
      </div>
    </>
  );
};
