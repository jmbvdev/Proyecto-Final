import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import s from "../styles/userDetails.module.css";
import image from "../images/profileDetails.webp";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import avatar from "../images/avatar 1.gif";

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

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        Promise.resolve(
          Toast.fire({
            icon: "warning",
            title: `User banned!`,
          })
        );
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
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        });
        Promise.resolve(
          Toast.fire({
            icon: "info",
            title: `User available again!`,
          })
        );
      });
  };

  const handleSetAdmin = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
      },
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "question",
      title: `Are you sure to set admin mode? Once it has been seted there is no way back!`,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .put(
            `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
            { role: ["admin"] }
          )
          .then((res) => {
            setUser(res.data);
          });
      }
    });
  };
  const handleSetModerator = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: ["moderator"] }
      )
      .then((res) => {
        setUser(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        });
        Promise.resolve(
          Toast.fire({
            icon: "info",
            title: `This user is a moderator now!`,
          })
        );
      });
  };
  const handleSetModeratorOff = () => {
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${id}`,
        { role: ["user"] }
      )
      .then((res) => {
        setUser(res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        });
        Promise.resolve(
          Toast.fire({
            icon: "info",
            title: `This user is a common user now!`,
          })
        );
      });
  };

  if (user)
    return (
      <div className={s.container}>
        <button onClick={useGoBack} className={s.back}>
          <IoIosArrowBack />
        </button>

        <div className={s.wraper}>
          <div className={s.profile}>
            <img src={image} alt="" className={s.calatea} />
            <div className={s.specs}>
              <p>{user.customClaims?.role?.[0] || "User"}</p>
              <img
                src={user?.photoURL || avatar}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "https://i.stack.imgur.com/4powQ.gif";
                }}
                alt="Not Found"
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
                  <div className={s.admin_container}>
                    <p>User banned</p>
                    <button  className={s.admin_btn} onClick={handleUnbanUser}>Unban</button>
                  </div>
                ) : null}
                {admin?.role[0] === "admin" &&
                user.customClaims?.role?.[0] !== "admin" ? (
                  user.customClaims?.role?.[0] === "moderator" ? (
                    <div className={s.admin_container}>
                      <button className={s.admin_btn} onClick={handleSetAdmin}>SET ADMIN ROLE</button>
                      <button className={s.admin_btn} onClick={handleSetModeratorOff}>
                        PUT OFF MOD ROLE
                      </button>
                    </div>
                  ) : (
                    <div>
                      {!user.disabled ? (
                        <div className={s.admin_container}>
                          <button className={s.admin_btn} onClick={handleBanUser}>BAN USER</button>
                          <button className={s.admin_btn} onClick={handleSetAdmin}>
                            SET ADMIN ROLE
                          </button>
                          <button className={s.admin_btn} onClick={handleSetModerator}>
                            SET MOD ROLE
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <Loading />;
};

export default UserDetail;
