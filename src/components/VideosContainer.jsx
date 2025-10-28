import "../css/VideosContainer.css";
import data from "../data.json";
import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import Button from "./Button.jsx";
import playAgainIcon from "../assets/images/icons/again.png";
import GradientText from "./GradientText.jsx";

function VideosContainer({ chosenRole }) {
  const roleTree = data["game-tree"][chosenRole];
  const [currentNode, setCurrentNode] = useState(roleTree);
  const [ended, setEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef(null);

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
      modestbranding: 1,
      iv_load_policy: 3,
      controls: 1,
      showinfo: 0,
      vq: "hd1080",
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    setIsLoading(false);
    // force 1080p if available
    try {
      event.target.setPlaybackQuality("hd1080");
    } catch (err) {
      console.warn("couldn’t force 1080p:", err);
    }
  };

  const onEnd = () => setEnded(true);
  const handleReplay = () => setEnded(false);

  const handleChoiceClick = (choice) => {
    const nextKey = choice.next;
    const nextNode = currentNode.next?.[nextKey];

    if (nextNode) {
      setCurrentNode(nextNode);
      setEnded(false);
      setIsLoading(true);
    } else {
      setCurrentNode({ video: roleTree["end-video"], choices: [] });
      setEnded(false);
      setIsLoading(true);
    }
  };

  return (
    <div className="container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p className="loading-text">טוען את הסרטון...</p>
        </div>
      )}

      {!ended ? (
        <div className="youtube-container">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            style={{ height: "100%" }}
          />
        </div>
      ) : (
        <div className="video-ended-message">
          <img
            src={playAgainIcon}
            alt="playAgainIcon"
            className="play-again-icon"
            onClick={handleReplay}
            title="צפה שוב בסצנה"
          />
          {currentNode.choices?.length > 0 ? (
            <>
              <p className="title-choices">אז מה תעשי?</p>
              <div className="choices-btns-container">
                {currentNode.choices.map((choice, i) => (
                  <Button
                    key={i}
                    text={choice.text}
                    onClick={() => handleChoiceClick(choice)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <GradientText>כל הכבוד!</GradientText>
              <p className="text-mashov">{roleTree.mashov}</p>
              <GradientText className="dir-mashov">
                פנ/י למסביר לקבלת משוב
              </GradientText>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideosContainer;
