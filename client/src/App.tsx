import Socket from "socket.io-client";
import "./App.css";
import { useMemo, useEffect, useRef } from "react";
import React from "react";

function App() {
  const socket = useMemo(() => Socket("http://localhost:4000"), []);
  const constraints = useMemo(() => ({ video: true }), []);

  useEffect(() => {
    socket.on("stream", (stream: any) => {
      console.log(stream);
    });
    
  }, [socket]);

  // access the camera and microphone
  // add a video element with the webcam stream as source

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      socket.emit("message", JSON.stringify({ content: stream, author: "test"}))
      stream.getTracks().forEach(track => {
        socket.emit("message", JSON.stringify({ content: track, author: "tracks"}))
      }
      )


      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error("error:", err);
    });
  },  [constraints, socket, videoRef])

  // var peer = new RTCPeerConnection();


  return (
    <div id="video-player">
      <video ref={videoRef} autoPlay playsInline muted />
      <button
      onClick={() => {
        socket.emit("message", JSON.stringify({ content: "message", author: "user" }));


      }
      }
      >
        Send Message
      </button>

    </div>
  );
}

export default App;
