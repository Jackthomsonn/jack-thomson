import { Suspense } from "react";
import { ErrorBoundary } from "../error/ErrorBoundary";
import { Spinner } from "../spinner/Spinner";
import { Tile } from "../tile/Tile";
import "./HomeTotals.css";

export const HomeTotals = () => {
  return (
    <div>
      <p>
        As a passionate advocate for technology and a firm believer in our capacity to create a more sustainable world, I've developed a personal service right within my home dedicated to monitoring energy usage. The below tiles represent the energy consumption and carbon emissions
        for my home over the last day. These values are provided by my personal
        project <a href="https://github.com/Jackthomsonn/home_monitor" target="_blank" rel="noreferrer" className="home-monitor">Home Monitor</a>.
      </p>
      <div className="home_totals_container">
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Tile
              type="consumptionTotal"
              title="Total energy consumption kWh"
            />
            <Tile type="carbonTotal" title="Total carbon emitted g/CO2" />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
