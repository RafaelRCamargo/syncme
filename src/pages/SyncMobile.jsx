import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//Context
import { MqttContext } from "../context/MqttContext";
import { SyncContext } from "../context/SyncContext";

import "../styles/SyncMobile.css";

export default function SyncMobile() {
  const { rootId, mobileId } = useParams();
  const { sendMessage, loaded } = useContext(MqttContext);
  const { setRootId, setMobileId } = useContext(SyncContext);

  useEffect(() => {
    if (rootId && mobileId) {
      setRootId(rootId);
      setMobileId(mobileId);
    }
  }, [rootId, mobileId, setRootId, setMobileId]);

  useEffect(() => {
    if (loaded) {
      handleSendMessage(
        `{"rootId":${rootId}, "mobileId":${mobileId}}`,
        "syncme"
      );
    }
  }, [rootId, mobileId, loaded]);

  const handleSendMessage = (message, topic) => {
    if (loaded) {
      console.log(`Sending Message: ${message}, on topic ${topic}`);
      sendMessage(message, topic);
    }
  };

  return (
    <div className="container-home">
      {rootId && mobileId ? (
        <>
          <p className="subtitle-home">
            Mobile: <strong>{mobileId}</strong>
          </p>
          <p className="subtitle-home">
            Root: <strong>{rootId}</strong>
          </p>
        </>
      ) : (
        <>
          <p className="subtitle-home">
            <i>Loading...</i>
          </p>
        </>
      )}
    </div>
  );
}
