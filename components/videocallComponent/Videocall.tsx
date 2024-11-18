// components/VideoCall.js
'use client'
import { JitsiMeeting } from '@jitsi/react-sdk';

interface VideoProps{
    roomName:string;
    
}

const VideoCall = ({ roomName }:VideoProps) => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={roomName}
        
        configOverwrite={{
          startWithAudioMuted: true,
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
        }}
       
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '700px';
          iframeRef.style.width = '100%';
        }}
      />
    </div>
  );
};

export default VideoCall;
