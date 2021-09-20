import React, { useEffect, useContext } from "react";

//Libs
import QRCode from "react-qr-code";

//Context
import { MqttContext } from "../context/MqttContext";
import { SyncContext } from "../context/SyncContext";

import '../styles/Home.css'

export default function Home() {
  const { sendMessage, loaded, lastMessage } = useContext(MqttContext);
  const { rootId, mobileId } = useContext(SyncContext);

  useEffect(() => {
    console.log("Root: ", rootId);
    console.log("Mobile: ", mobileId);
  }, [rootId, mobileId]);

  useEffect(() => {
    if (lastMessage) {
      console.log(lastMessage);
    }
  }, [lastMessage])

  const handleSendMessage = (message, topic) => {
    if (loaded) {
      sendMessage(message, topic);
    }
  }

  return (
    <div className="container-home">
      <h1 className="title-home">SyncMe.</h1>
      <p className="subtitle-home">
        A little project based on <strong>syncing desktop</strong>
        and <strong>mobile browser</strong>, and then
        interacting themselves.
      </p>
      <QRCode
        className="qr-home"
        title={`${window.location.host}/sync/${rootId}/${mobileId}`}
        value={`${window.location.host}/sync/${rootId}/${mobileId}`}
        bgColor="#F2EADF" fgColor="#262523" size={384}
      />
      <button onClick={() => handleSendMessage("Ok!", "syncme")}>AAA</button>
      <a className="footer-copyrights" href="https://github.com/RafaelRCamargo" target="_blank" rel="noreferrer">© 1900-2021 Rafael R. Camargo</a>
    </div>
  );
}
