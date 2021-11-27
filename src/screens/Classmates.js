import React , {useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import "./Classmates.css";

function Classmates() {

  const [ peopleList, setPeopleList] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
      classList();
    });

  const classList = async() => {
    try {
  
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data().enrolledClassrooms;
            Object.keys(data).forEach(k => {
              setPeopleList(arr => [...arr , data[k]])
            });
        });
    }); 
  } catch(error){
        console.log("Error getting List: ", error);
    }
  };
  
return (
    <>
    <div style={{backgroundColor: "#D0FDF4"}}>
        <center>
          <h1 style={{color: "#500D55"}}>List of Students</h1>
        </center>
        
        {peopleList.map((data) => (
            <li className="list"> 
              {data.userName}
            </li>
          ))
        }
    </div>
    </>
  );
}

export default Classmates;

