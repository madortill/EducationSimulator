import "../css/VideosContainer.css";
import data from "../data.json";
import React, { useState } from "react";
import YouTube from "react-youtube";
import Button from "./Button.jsx";
import playAgainIcon from '../assets/images/icons/again.png';
import GradientText from "./GradientText.jsx";

function VideosContainer({ chosenRole }) {
  const roleTree = data["game-tree"][chosenRole];

  // נתחיל מהצומת הראשית (הסצנה הראשונה)
  const [currentNode, setCurrentNode] = useState(roleTree);
  const [ended, setEnded] = useState(false);

  // חילוץ מזהה הסרטון
  const getVideoId = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1];
    if (url.includes("watch?v=")) return url.split("v=")[1];
    return url;
  };

  const videoId = getVideoId(currentNode.video);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1, // בלי לוגו יוטיוב
      iv_load_policy: 3, // בלי הצעות על המסך
      controls: 1,
      showinfo: 0,
      vq: "hd1080",
    },
  };

  // כשהסרטון מסתיים
  const onEnd = () => setEnded(true);

  // 🎥 צפייה חוזרת — רק מבטל את מצב הסוף
  const handleReplay = () => {
    setEnded(false); // מנגן שוב את אותו סרטון
  };

  // כשלוחצים על בחירה
  const handleChoiceClick = (choice) => {
    const nextKey = choice.next;
    const nextNode = currentNode.next?.[nextKey];

    if (nextNode) {
      setCurrentNode(nextNode);
      setEnded(false);
    } else {
      setCurrentNode({ video: roleTree["end-video"], choices: [] });
      setEnded(false);
    }
  };

  return (
    <div className="container">
      {!ended ? (
        <div className="youtube-container">
          <YouTube
            videoId={videoId}
            opts={opts}
            onEnd={onEnd}
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="video-ended-message">
          {/* כפתור הצפייה החוזרת */}
          <img
            src={playAgainIcon}
            alt="playAgainIcon"
            className="play-again-icon"
            onClick={handleReplay}
            title="צפה שוב בסצנה"
          />

          

          {/* כפתורי הבחירה */}
          {currentNode.choices?.length > 0 ? (
            <>
            <p className="title-choices">אז מה תעשי?</p>
           { currentNode.choices.map((choice, i) => (
              <Button
                key={i}
                text={choice.text}
                onClick={() => handleChoiceClick(choice)}
              />
            ))}
            </>
            
          ) : (
            // <p className="to-the-mashov-title">בהצלחה במשוב!</p>
            <GradientText>וקדימה למשוב!</GradientText>
          )}
        </div>
      )}
    </div>
  );
}

export default VideosContainer;
