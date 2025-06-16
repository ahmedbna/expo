// Example usage of the Camera component
import { Button } from '@/components/ui/button';
import { Camera } from '@/components/ui/camera';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function CameraExample() {
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');

  const handleCapture = (uri: string) => {
    setCapturedImage(uri);
    setShowCamera(false);
    Alert.alert('Photo Captured!', 'Your photo has been taken successfully.');
  };

  const handleOpenCamera = () => {
    setCapturedImage(null);
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <Camera
        onCapture={handleCapture}
        onClose={handleCloseCamera}
        facing='back'
        enableTorch={true}
        showControls={true}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text variant='heading' style={styles.title}>
          Camera Component
        </Text>

        <Text variant='body' style={styles.description}>
          Tap the button below to open the camera and take a photo.
        </Text>

        {capturedImage && (
          <View style={[styles.imageContainer, { backgroundColor: cardColor }]}>
            <Text variant='subtitle' style={styles.imageTitle}>
              Captured Photo:
            </Text>
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            variant='default'
            size='lg'
            onPress={handleOpenCamera}
            style={styles.button}
          >
            Open Camera
          </Button>

          {capturedImage && (
            <Button
              variant='outline'
              size='lg'
              onPress={() => setCapturedImage(null)}
              style={styles.button}
            >
              Clear Photo
            </Button>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  imageContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
    alignItems: 'center',
    maxWidth: '100%',
  },
  imageTitle: {
    marginBottom: 12,
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  button: {
    minWidth: 200,
  },
});
