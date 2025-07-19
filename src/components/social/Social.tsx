import { BirdIcon, WaypointsIcon } from "lucide-react";
import "./Social.css";

export const Social = () => {
  return (
    <>
      <div className="button-container">
        <a
          href="https://github.com/Jackthomsonn"
          target="_blank"
          rel="noreferrer"
        >
          <button className="github">
            <svg role="img" width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            <span>Github</span>
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/jackthomsonn"
          target="_blank"
          rel="noreferrer"
        >
          <button className="linkedin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 67 66"
              fill="#fff"
              fillRule="evenodd"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="20"
              height="20"
            >
              <use xlinkHref="#A" x="1" y="1" />
              <symbol id="A" overflow="visible">
                <g stroke="none" fillRule="nonzero">
                  <path
                    d="M59.26 0H4.724C2.12 0 0 2.066 0 4.61v54.788c0 2.53 2.12 4.6 4.724 4.6h54.54c2.61 0 4.736-2.07 4.736-4.6V4.61C64 2.066 61.874 0 59.26 0z"
                    fill="#0177b5"
                  />
                  <path d="M9.49 23.992H19v30.54H9.49zm4.748-15.2c3.034 0 5.5 2.466 5.5 5.5a5.51 5.51 0 0 1-5.498 5.506 5.52 5.52 0 0 1-5.508-5.506 5.5 5.5 0 0 1 5.506-5.5m10.7 15.2h9.104v4.174h.126c1.268-2.4 4.364-4.932 9-4.932 9.612 0 11.386 6.326 11.386 14.548v16.752h-9.486V39.678c0-3.54-.064-8.1-4.932-8.1-4.94 0-5.7 3.86-5.7 7.84v15.108h-9.484v-30.54z" />
                </g>
              </symbol>
            </svg>
            Linkedin
          </button>
        </a>
        <a
          href="https://passionfruitsoftware.com"
          target="_blank"
          rel="noreferrer"
        >
          <button className="passionfruit">
            <img src="/pf.svg" alt="Passion Fruit Software" width={22} height={14} />
            PassionFruit Software
          </button>
        </a>
        <a
          href="https://eyrie.app"
          target="_blank"
          rel="noreferrer"
        >
          <button className="eyrie">
            <BirdIcon />
            Eyrie
          </button>
        </a>
        <a
          href="https://enql.app"
          target="_blank"
          rel="noreferrer"
        >
          <button className="enql">
            <WaypointsIcon />
            Enql
          </button>
        </a>
      </div>
    </>
  );
};
