import Socket from "socket.io-client";
import './App.css';
import { useMemo, useEffect } from 'react';

function App() {
  const socket = useMemo(() => Socket("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("stream", (stream) => {
      console.log(stream);
    });
  }, [socket]);

  // access the camera and microphone
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        console.log(stream);
        socket.emit("stream", stream);
      }
      )
      .catch(err => {
        console.log(err);
      }
      );
  }, [socket]);



  return (
    <div>


    </div>
  );
}

export default App;
