import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { SWRConfig, SWRConfiguration } from "swr";
import "./App.css";
import { HomeTotals } from "./components/homeTotals/HomeTotals";
import { Profile } from "./components/profile/Profile";
import { Social } from "./components/social/Social";
import { inject } from '@vercel/analytics';

function App() {
  const SWRConfigOptions: SWRConfiguration = {
    fetcher: (url: string) =>
      fetch(url).then(async (r) => {
        if (r.status === 200) {
          return r.json();
        }
        const { message } = await r.json();
        throw new Error(message);
      }),
    suspense: true,
  };

  inject();

  return (
    <>
      <Confetti {...useWindowSize()} recycle={false} />
      <div className="container">
        <div className="container__inner">
          <SWRConfig value={SWRConfigOptions}>
            <Profile />
            <HomeTotals />
            <Social />
          </SWRConfig>
        </div>
      </div>
    </>
  );
}

export default App;
