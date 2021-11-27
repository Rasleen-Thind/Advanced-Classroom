import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../firebase';
import SendMessage from './SendMessage';
import Rotate from 'react-reveal/Rotate';
import "./Announcement.css";

function Chat() {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
        <div className="chat-background">
            <Rotate top left>
            <h1 className="chat-heading">Discussion Room</h1> 
            </Rotate>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                        <div className="announcement__imageContainer">
                            <img src={photoURL} className="imgs" alt="Profile pic" />
                            </div> 
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
        <Rotate bottom left>
        <img src="https://us.123rf.com/450wm/anisimovfedor/anisimovfedor1802/anisimovfedor180200073/96193178-conversation-of-friends-vector-illustration-in-a-flat-style.jpg?ver=6" />
        </Rotate>
        </div>
    )
}

export default Chat;