import React from 'react'
import { useParams } from "react-router-dom";

import '../styles/SyncMobile.css'

export default function SyncMobile() {
  const { rootId, mobileId } = useParams()

  return (
    <div className="container-home">
      <p className="subtitle-home">Root: {rootId}</p>
      <p className="subtitle-home">Mobile: {mobileId}</p>
      <a className="footer-copyrights" href="https://github.com/RafaelRCamargo">© 1900-2021 Rafael R. Camargo</a>
    </div>
  )
}
