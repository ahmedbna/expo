// registry/examples/camera-minimal.tsx
import { Camera } from '@/components/ui/camera';
import React from 'react';
import { Alert } from 'react-native';

export function CameraMinimal() {
  const handleCapture = ({ uri, type }: { uri: string; type: string }) => {
    Alert.alert('Minimal Camera', 'Simple capture completed');
  };

  return (
    <Camera
      showControls={false}
      enableVideo={false}
      enableTorch={false}
      onCapture={handleCapture}
      style={{
        height: 300,
        borderRadius: 8,
        overflow: 'hidden',
      }}
    />
  );
}
