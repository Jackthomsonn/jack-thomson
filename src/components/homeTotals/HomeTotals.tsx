import { Suspense } from "react";
import { ErrorBoundary } from "../error/ErrorBoundary";
import { Spinner } from "../spinner/Spinner";
import { Tile } from "../tile/Tile";
import "./HomeTotals.css";

export const HomeTotals = () => {
  return (
    <div>
      <p>
        The values you see below represent the energy consumption and carbon
        emissions for my home over the last day
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
