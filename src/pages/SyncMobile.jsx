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
      handleSendMessage(`{"isSync": true}`, "syncme");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootId, mobileId, loaded]);

  const handleSendMessage = (message, topic) => {
    if (loaded) {
      sendMessage(message, topic);
    }
  };

  return (
    <div className="container-home">
      {rootId && mobileId ? (
        <>
          <button
            className="big-boy"
            onClick={() =>
              handleSendMessage(
                `{"rootId": ${rootId}, "mobileId": ${mobileId}, "jump": true, "reset": false}`,
                "syncme"
              )
            }
          >
            Jump?
          </button>
          <button
            onClick={() =>
              handleSendMessage(
                `{"rootId": ${rootId}, "mobileId": ${mobileId}, "jump": false, "reset": true}`,
                "syncme"
              )
            }
          >
            Reset?
          </button>
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
