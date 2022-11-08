import React from "react";

function PlayIcon() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#fff"
      viewBox="0 0 24 24"
    >
      <path d="M16.315 13.316l-7.635 4.43c-.648.376-1.48-.079-1.48-.836V8.05c0-.757.83-1.213 1.48-.836l7.635 4.43a.963.963 0 010 1.672z"></path>
    </svg>
  );
}

function DarkPlayIcon() {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="#000"
      viewBox="0 0 24 24"
    >
      <path d="M16.315 13.316l-7.635 4.43c-.648.376-1.48-.079-1.48-.836V8.05c0-.757.83-1.213 1.48-.836l7.635 4.43a.963.963 0 010 1.672z"></path>
    </svg>
  );
}



export { PlayIcon, DarkPlayIcon };