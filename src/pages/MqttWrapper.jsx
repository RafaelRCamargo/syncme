import React, { useEffect, useContext } from 'react'
import Routes from '../routes/Routes'

//Context
import { MqttContext } from '../context/MqttContext';
import { SyncContext } from "../context/SyncContext";

export const MqttWrapper = () => {
  const { MQTTConnect } = useContext(MqttContext);
  const { setRootId, setMobileId } = useContext(SyncContext);

  useEffect(() => {
    MQTTConnect()
    setRootId(Math.round(Math.random()*999999))
    setMobileId(Math.round(Math.random()*999999))
    // eslint-disable-next-line
  }, [])

  return (
    <Routes />
  )
}
