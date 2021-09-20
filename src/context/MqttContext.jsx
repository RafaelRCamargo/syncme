import React, { createContext, useState } from "react";
import pahoMqtt from "paho-mqtt";

export const MqttContext = createContext({});

/* 
 * Mqtt precisa ser uma variavel de acesso global, 
 * por isso é definida fora do provider. 
 */
let mqtt;

export const MqttProvider = (props) => {
  //Consts
  const reconnectTimeout = 2000;
  const host = "test.mosquitto.org";
  const port = 8081;

  //States
  const [loaded, setLoaded] = useState(false)
  const [lastMessage, setLastMessage] = useState()

  function sendMessage(message, topic) {
    if (message && topic) {
      let mqttMessage = new pahoMqtt.Message(`{"message": ${message}}`);
      mqttMessage.destinationName = topic;
      mqttMessage.qos = 1;
      mqtt.send(mqttMessage);
    }
  }

  function onConnect() {
    console.log("Successfully connected!");

    //Topico para receber mensagens
    mqtt.subscribe("syncme");
    setLoaded(true);
  }

  function onError(message) {
    //Faz um log do erro
    console.log("Error: " + message.errorCode + " " + message.errorMessage);

    //Reconecta ao broker
    setTimeout(MQTTConnect, reconnectTimeout);
  }

  function onMessageArrived(msg) {
    //Setta o state de lastMessage apartir da mensagem recebida
    const message = JSON.parse(msg.payloadString)
    setLastMessage(message.message)
  }

  function MQTTConnect() {
    console.log(`Conecting to ${host}:${port}`);

    //Cria e configura o client
    mqtt = new pahoMqtt.Client(
      host,
      port,
      "SyncMeClient" + parseInt(Math.random() * 1e5)
    );
    let options = {
      timeout: 10,
      keepAliveInterval: 10,
      onSuccess: onConnect,
      onFailure: onError,
      useSSL: true
    };

    //Return padrão
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onError;

    //Finalizando a conexão
    mqtt.connect(options);
  }

  return (
    <MqttContext.Provider value={{ MQTTConnect, sendMessage, loaded, lastMessage }}>
      {props.children}
    </MqttContext.Provider>
  );
};
