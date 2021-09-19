import React, { useEffect, useContext } from "react";

//Libs
import QRCode from "react-qr-code";

//Context
import { MqttContext } from "../context/MqttContext";
import { SyncContext } from "../context/SyncContext";

export default function Home() {
  const { sendMessage, loaded } = useContext(MqttContext);
  const { rootId, mobileId } = useContext(SyncContext);

  useEffect(() => {
    console.log("Root: ", rootId);
    console.log("Mobile: ", mobileId);
  }, [rootId, mobileId]);
  
  const handleSendMessage = (message, topic) => {
    if (loaded) {
      console.log(`Sending Message: ${message}, on topic ${topic}`);
      sendMessage(message, topic);
    } 
  } 

  return (
    <div>
      <button onClick={() => handleSendMessage("Ok!", "syncme")}>AAA</button>
      <QRCode
        title={`${window.location.host}/sync/${rootId}/${mobileId}`}
        value={`${window.location.host}/sync/${rootId}/${mobileId}`}
      />
    </div>
  );
}
