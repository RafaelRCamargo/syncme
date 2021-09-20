import React from 'react'
import { useParams } from "react-router-dom";

export default function SyncMobile() {
  const { rootId, mobileId } = useParams()

  return (
    <div>
      Root: {rootId}
      <br />
      Mobile: {mobileId}
    </div>
  )
}
