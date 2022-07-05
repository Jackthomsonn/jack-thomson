import React, { useMemo } from "react";
import "./App.css";
import * as GitHub from "github-api";

function App() {
  const getGithubProfile = () => {
    new GitHub()
      .getUser("jackthomsonn")
      .getProfile((err: Error, { avatar_url }: any) => {
        if (err) {
          return;
        }

        document.documentElement.style.setProperty(
          "--avatarUrl",
          `url(${avatar_url})`
        );
      });
  };

  useMemo(() => {
    getGithubProfile();
  }, []);

  return (
    <div className="container">
      <div className="top">
        <div className="profile-photo"></div>
        <h2>Jack Thomson</h2>
        <p>
          Currently working as a Lead software engineer at{" "}
          <a href="https://sero.life/" target="_blank" rel="noreferrer">
            Sero
          </a>
        </p>

        <div className="button-container">
          <a
            href="https://github.com/Jackthomsonn"
            target="_blank"
            rel="noreferrer"
          >
            <button className="github">
              <svg
                width="20"
                height="20"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                  fill="#1B1F23"
                />
              </svg>
              Github
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
        </div>
      </div>
    </div>
  );
}

export default App;
