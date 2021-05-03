/** @format */

import React from "react";

const Videobg = () => {
  const videoKey = [
    "9BPMTr-NS9s",
    "jDW2AUrTq-E",
    "odM92ap8_c0",
    "sfM7_JLk-84",
    "wAJcykyq7DU",
    "kP9TfCWaQT4",
  ];

  const randomNo = Math.floor(Math.random() * videoKey.length);
  const videoSrc = videoKey[randomNo];
  console.log(videoSrc);
  return (
    <div className="video-bg-2">
      <iframe
        title="video"
        src={
          "https://www.youtube.com/embed/" +
          videoSrc +
          "?controls=1&showinfo=0&autohide=1&rel=0&"
        }
        frameborder="0"
        allowfullscreen="allowfullscreen"></iframe>
    </div>
  );
};

export default Videobg;
