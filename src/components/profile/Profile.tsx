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
        Staff Software Engineer focused on aligning technical solutions with business goals. Experienced in cloud, DevOps, and modern full-stack development.
        Currently working at{" "}
        <a href="https://equalsmoney.com/" target="_blank" rel="noreferrer">
          Equals Money
        </a>{" "}
      </p>
    </>
  );
};
