import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

//Libs
import QRCode from "react-qr-code";

//Context
import { MqttContext } from "../context/MqttContext";
import { SyncContext } from "../context/SyncContext";

import "../styles/Home.css";

export default function Home() {
  const { sendMessage, loaded, lastMessage } = useContext(MqttContext);
  const { rootId, mobileId } = useContext(SyncContext);

  let history = useHistory();

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.message) {
        alert(lastMessage.message);
      } else if (lastMessage.isSync) {
        history.push(`/sync-desktop/${rootId}/${mobileId}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  const handleSendMessage = (message, topic) => {
    if (loaded) {
      sendMessage(message, topic);
    }
  };

  return (
    <div className="container-home">
      <h1 className="title-home">SyncMe.</h1>
      <p className="subtitle-home">
        A little project based on <strong>syncing desktop</strong>
        and <strong>mobile browser</strong>, and then interacting themselves.
      </p>
      <a
        href={`${window.location.href}sync-mobile/${rootId}/${mobileId}`}
        target="_blank"
        rel="noreferrer"
      >
        <QRCode
          className="qr-home"
          title={`${window.location.host}/sync-mobile/${rootId}/${mobileId}`}
          value={`${window.location.host}/sync-mobile/${rootId}/${mobileId}`}
          bgColor="#f5e7d5"
          fgColor="#262523"
          size={384}
        />
      </a>
      <a
        href={`${window.location.href}sync-mobile/${rootId}/${mobileId}`}
        target="_blank"
        rel="noreferrer"
      >
        No cam? no problem, just click it! ^ ^ ^
      </a>
      <button
        onClick={() =>
          handleSendMessage(`{"message": "That's a good sign!"}`, "syncme")
        }
      >
        Test message.
      </button>
    </div>
  );
}
