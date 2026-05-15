import GitHub from "github-api";
import { useEffect, useState } from "react";
import "./Profile.css";

const github = new GitHub();

interface ProfileProps {
  onBack?: () => void
  playHoverSound?: () => void
}

export const Profile = ({ onBack, playHoverSound }: ProfileProps) => {
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getGithubProfile = async () => {
      try {
        const user = github.getUser("jackthomsonn");
        const { data } = await user.getProfile();
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
        if (data?.bio) setBio(data.bio);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      } finally {
        setTimeout(() => setReady(true), 80);
      }
    };
    getGithubProfile();
  }, []);

  return (
    <div className={`profile-panel ${ready ? 'profile-panel--ready' : ''}`}>
      <button className="profile-back" onClick={onBack} onMouseEnter={playHoverSound}>
        <span className="profile-back__arrow">◀</span>
        <span>BACK</span>
      </button>

      <div className="profile-header">
        <span className="profile-tag">{'// PROFILE_DATA.sys'}</span>
        <div className="profile-header__line" />
      </div>

      <div className="profile-body">
        <div className="profile-photo-wrap">
          {avatarUrl && <img className="profile-photo" src={avatarUrl} alt="Jack Thomson" />}
          <div className="profile-photo-scan" />
          <div className="profile-photo-ring" />
        </div>

        <div className="profile-info">
          <div className="profile-row">
            <span className="profile-key">NAME</span>
            <span className="profile-val">Jack Thomson</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">ROLE</span>
            <span className="profile-val">Staff Software Engineer</span>
          </div>
          <div className="profile-row">
            <span className="profile-key">ORG</span>
            <span className="profile-val">
              <a href="https://equalsmoney.com/" target="_blank" rel="noreferrer">Equals Money</a>
            </span>
          </div>
          {bio && (
            <div className="profile-bio-block">
              <div className="profile-bio-divider" />
              <p className="profile-bio">{bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
