import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { SWRConfig } from "swr";
import "./App.css";
import { HomeTotals } from "./components/homeTotals/HomeTotals";
import { Profile } from "./components/profile/Profile";
import { Social } from "./components/social/Social";

function App() {
  const { width, height } = useWindowSize();

  const SWRConfigOptions = {
    fetcher: (url: string) => fetch(url).then((r) => r.json()),
    suspense: true,
  };

  return (
    <div className="container">
      <Confetti width={width} height={height} recycle={false} />

      <div className="container__inner">
        <SWRConfig value={SWRConfigOptions}>
          <Profile />
          <HomeTotals />
          <Social />
        </SWRConfig>
      </div>
    </div>
  );
}

export default App;
