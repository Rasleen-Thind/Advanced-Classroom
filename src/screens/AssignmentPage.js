import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Assignment from "../components/Assignment";
import { auth, storage} from "../firebase";
import "./Class.css";

function Class() {
  const [data, setData] = useState([]);
  const [postAssignment, setPostAssignment] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  /*
    PLAN: Create a snapshot listener and fill in the data into classData, 
    and then map through it during render
  */
  const upload = async () => {
    if(postAssignment == null)
      return;
    storage.ref(`/assignments/${postAssignment.name}`).put(postAssignment)
    .on("state_changed" , alert("success") , alert);

  }

  const listItem = () => {
    const temp=[];
    storage.ref().child('assignments/').listAll()
      .then(res => {
        let path = storage.ref().child('assignments/').fullPath;
            path = path.replace(/\b\/\b(?!.*?\b\/\b)/, "%2F");
            res.items.forEach(fileRef => {
                temp.push({name:  fileRef.name, url: path + "%2F" + fileRef.name +"?alt=media"  })
            });
        }).then(()=>{
        
            // set data in your any state variable for later use
            setData(temp)
        }).catch(error => {
            console.log(error);
        })
  }


  return (
    <div className="class">
      <div className="class__nameBox">
        <div className="class__name"></div>
      </div>
      <div className="class__announce">
        <img src={user?.photoURL} alt="My pic" />
        <div>    
        <input type="file" onChange={(e)=>{setPostAssignment(e.target.files[0])}} placeholder="Assign work to your class"/>
        <button onClick={upload}>Upload</button>
        </div>
        <IconButton onClick={listItem}>List Assignments
            <SendOutlined />
        </IconButton>
      </div>
      {
        data?.map((val) => (
        <Assignment 
            content={val.name}
            url={val.url}
        />
        ))
        }
      </div>
    
  );
}

export default Class;
