import GitHub from "github-api";
import { useEffect, useState } from "react";
import "./Profile.css";

const github = new GitHub();

const attachProfilePhoto = (avatarUrl: string) => {
  document.documentElement.style.setProperty("--avatarUrl", `url(${avatarUrl})`);
};

export const Profile = () => {
  const [bio, setBio] = useState("");
  useEffect(() => {
    const getGithubProfile = async () => {
      try {
        const user = github.getUser("jackthomsonn");
        const { data } = await user.getProfile();
        if (data?.avatar_url) {
          attachProfilePhoto(data.avatar_url);
        }
        if (data?.bio) {
          setBio(data.bio);
        }
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    getGithubProfile();
  }, []);

  return (
    <>
      <div className="profile-photo"></div>
      <h2>Jack Thomson</h2>
      <p>
        {bio}{" "}
        Currently working at{" "}
        <a href="https://equalsmoney.com/" target="_blank" rel="noreferrer">
          Equals Money
        </a>{" "}
      </p>
    </>
  );
};
