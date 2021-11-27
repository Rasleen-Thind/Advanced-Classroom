import { Avatar, IconButton } from "@material-ui/core";
import { Apps, Menu as MenuIcon } from "@material-ui/icons";
import People from "@material-ui/icons/People";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ClassNavbar.css";


function ClassNavbar() {
    const [user, loading, error] = useAuthState(auth);
    const [classData, setClassData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        db.collection("classes")
          .doc(id)
          .onSnapshot((snapshot) => {
            const data = snapshot.data();
            //if (!data) history.replace("/");
            console.log(data);
            setClassData(data);
          });
    }, []);  

return (
    <>
      <nav className="navbar">
        <div className="navbar__left">
          <IconButton>
            <MenuIcon style={{ color: "#CC0066" }}/>
          </IconButton>
          <img
            src="https://www.transparentpng.com/thumb/classroom/classroom-icon-transparent-free-2qESWq.png"
            alt="Classroom"
            className="navbar__logo"
          />{" "}
          <span>{classData?.name}</span>
        </div>
        <div className="navbar__center">
            <span>People</span>
            <IconButton onClick={("")}>
              <People style={{ color: "#CC0066" }}/>
            </IconButton>
        </div>
        <div className="navbar__right">
          <IconButton>
            <Apps style={{ color: "#CC0066" }}/>
          </IconButton>
          <IconButton onClick={logout}>
            <Avatar src={user?.photoURL} />
          </IconButton>
        </div>
      </nav>
    </>
  );
}

export default ClassNavbar;