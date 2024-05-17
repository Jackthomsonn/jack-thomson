import * as GitHub from "github-api";
import { useMemo } from "react";
import "./Profile.css";

type GithubResponse = {
  avatar_url: string;
};

const attachProfilePhoto = (avatarUrl: string) => {
  document.documentElement.style.setProperty(
    "--avatarUrl",
    `url(${avatarUrl})`
  );
};

const handleProfileResponse = (err: Error, { avatar_url }: GithubResponse) => {
  if (err) return;

  attachProfilePhoto(avatar_url);
};

export const Profile = () => {
  const getGithubProfile = () => {
    new GitHub().getUser("jackthomsonn").getProfile(handleProfileResponse);
  };

  useMemo(() => getGithubProfile(), []);

  return (
    <>
      <div className="profile-photo"></div>
      <h2>Jack Thomson</h2>
      <p>
        Currently working as a Lead software engineer at{" "}
        <a href="https://sero.life/" target="_blank" rel="noreferrer">
          Sero.
        </a>{" "}
      </p>

      {/* <div className="my-three-step-process">
        <span>1. Understand the problem at hand</span>
        <span>2. Craft a solution that addresses it effectively</span>
        <span>3. Refine and iterate</span>
      </div> */}
    </>
  );
};
