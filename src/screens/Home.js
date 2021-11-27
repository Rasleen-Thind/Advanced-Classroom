import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { auth, signInWithGoogle} from "../firebase";
import Rotate from 'react-reveal/Rotate';
import "./Home.css";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
      if (loading) return;
      if(user) history.push("/dashboard");
    }, [loading, user]);
  
  return (
    <div className="home" style={{ 
      backgroundImage: `url("http://i.pinimg.com/564x/d2/27/c5/d227c58540cc30fdcc2a5c51e2eee61e.jpg")` 
    }}>
      <Rotate top left>
      <div className="home__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
          alt="Google Classroom Pic"
          className="home__image"
        />
        <button className="home__login" onClick={signInWithGoogle}>
          Login 
        </button>
      </div>
      </Rotate>
      
    </div>
  );
}

export default Home;
