import React from "react";
import "./Announcement.css";

function Assignment({ image, name, date, content, authorId }) {
  return (
    <div className="announcement">
      <div className="announcement__informationContainer">
        <div className="announcement__infoSection">
          <div className="announcement__imageContainer">
          </div>
          <div className="announcement__nameAndDate">
            <div className="announcement__name">{name}</div>
            <div className="announcement__date">{date}</div>
          </div>
        </div>
        <div className="announcement__infoSection">
        </div>
      </div>
      <a href="'https://firebasestorage.googleapis.com/v0/b/advanced-classroom-b0ce7.appspot.com/o/ + {content}'" >{content}</a>
    </div>
  );
}

export default Assignment;
