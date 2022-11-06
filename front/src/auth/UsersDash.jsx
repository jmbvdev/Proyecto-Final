import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import s from "../styles/dashboard.module.css";
import image from "../images/profile.webp";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const UserDetail = () => {
  const [user, setUser] = React.useState(null);
  const id = useParams().id;
  const navigate = useNavigate();
  const admin = useSelector((state) => state.usersReducer.currentUser);

  React.useEffect(() => {
    if (!user) {
      axios
        .get(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`
        )
        .then((res) => setUser(res.data));
    }

    return () => {
      setUser(null);
    };
  }, []);

  function useGoBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  const handleBanUser = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: user.customClaims?.role || ["user"], disabled: true }
      )
      .then((res) => {
        setUser(res.data);
      });
  };

  const handleUnbanUser = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: user.customClaims?.role || ["user"], disabled: false }
      )
      .then((res) => {
        setUser(res.data);
      });
  };

  const handleSetAdmin = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: ["admin"] }
      )
      .then((res) => {
        setUser(res.data);
      });
  };
  const handleSetModerator = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: ["moderator"] }
      )
      .then((res) => setUser(res.data));
  };
  const handleSetModeratorOff = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: ["user"] }
      )
      .then((res) => setUser(res.data));
  };

  if (user)
    return (
      <div className={s.profile}>
        <button onClick={useGoBack}>Go back</button>
        <img src={image} alt="" className={s.calatea} />
        <div className={s.specs}>
          <p>{user.customClaims?.role?.[0] || "User"}</p>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className={s.profile_pic}
          />
          <h2>{user.displayName}</h2>
          <div className={s.text_specs}>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>

            <p>
              <strong>Last sing in: </strong>
              {user.metadata.lastSignInTime}
            </p>
            {user.disabled ? (
              <div>
                <p>User banned</p>
                <button onClick={handleUnbanUser}>Unban</button>
              </div>
            ) : null}
            {admin?.role[0] === "admin" &&
            user.customClaims?.role?.[0] !== "admin" ? (
              user.customClaims?.role?.[0] === "moderator" ? (
                <div>
                  <button onClick={handleSetAdmin}>SET ADMIN ROLE</button>
                  <button onClick={handleSetModeratorOff}>
                    PUT OFF MOD ROLE
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={handleBanUser}>BAN USER</button>
                  <button onClick={handleSetAdmin}>SET ADMIN ROLE</button>
                  <button onClick={handleSetModerator}>SET MOD ROLE</button>
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    );
  else return <Loading />;
};

export default UserDetail;
