// registry/examples/video-demo.tsx
import { Video } from '@/components/ui/video';
import React from 'react';

export function VideoDemo() {
  return (
    <Video
      source={{
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      style={{
        width: '100%',
        height: 200,
        borderRadius: 8,
      }}
      autoPlay={false}
      loop={false}
      muted={false}
      showControls={true}
    />
  );
}
