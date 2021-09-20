import React from "react";
import { MqttProvider } from "./context/MqttContext";
import { SyncProvider } from "./context/SyncContext";
import { MqttWrapper } from './pages/MqttWrapper'

import './styles/App.css'

const App = () => {
  return (
    <MqttProvider>
      <SyncProvider>
        <MqttWrapper />
      </SyncProvider>
    </MqttProvider>
  );
};

export default App;
