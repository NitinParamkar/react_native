import { Route, Routes, useNavigate } from 'react-router-dom'
import { ConnectForm } from '../components/ConnectForm'
import { LiveVideo } from '../components/LiveVideo'

import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";

import './style.css'

function doubtSession() {
  const agoraClient = useRTCClient( AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client

  return (
        <AgoraRTCProvider client={agoraClient}>
          <LiveVideo />
        </AgoraRTCProvider>
  )
}

export default doubtSession;