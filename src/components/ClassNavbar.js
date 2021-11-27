import { Avatar, IconButton } from "@material-ui/core";
import { Apps, Menu as MenuIcon } from "@material-ui/icons";
import People from "@material-ui/icons/People";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {FileCopy} from "@material-ui/icons";
import Chat from "@material-ui/icons/Chat";
import VideoCall from "@material-ui/icons/VideoCall";
import "./ClassNavbar.css";


function ClassNavbar() {
    const [user, loading, error] = useAuthState(auth);
    const [people, setPeople] = useState([]);
    const [classData, setClassData] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        db.collection("classes")
          .doc(id)
          .onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (!data) history.replace("/");
            console.log(data);
            setClassData(data);
          });
    }, []);  

    useEffect(() => {
      db.collection("users")
        .doc(id)
        .onSnapshot((snapshot) => {
          const data = snapshot.data();
          //if(!data) history.replace("/");
          console.log(data);
          setPeople(data);
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
            alt="Classroom Logo"
            className="navbar__logo"
          />{" "}
          <span>{classData?.name}</span>
        </div>
        <div className="navbar__center">
            <span>People</span>
            <IconButton onClick={() => window.location.replace(`/classmates`)}>
              <People style={{ color: "#CC0066" }}/>
            </IconButton>
        </div>
        <div className="navbar__center">
          <span>Group Chat</span>
          <IconButton onClick={() => window.location.replace(`/chat/:{data.uid}`)}>
          <Chat style={{ color: "#CC0066" }}/>
        </IconButton>
        </div>
        <div className="navbar__center">
          <span>Video Chat</span>
          <IconButton onClick={() => window.open(`https://www.microsoft.com/en-in/microsoft-teams/video-conferencing`)}>
          <VideoCall style={{ color: "#CC0066" }}/>
        </IconButton>
        </div>
        <div className="navbar__center">
          <span>Create Assignment</span>
          <IconButton onClick={() => window.location.replace(`/assignment/:{data.id}`)}>
            <FileCopy style={{ color: "#CC0066" }}/>
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