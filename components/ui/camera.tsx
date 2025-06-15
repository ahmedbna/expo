// components/ui/camera.tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, FONT_SIZE } from '@/theme/globals';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import {
  Camera as CameraIcon,
  SwitchCamera,
  X,
  Zap,
  ZapOff,
} from 'lucide-react-native';
import React, { forwardRef, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Button } from './button';
import { Text } from './text';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface CameraProps {
  style?: ViewStyle;
  onCapture?: (uri: string) => void;
  onClose?: () => void;
  facing?: CameraType;
  enableTorch?: boolean;
  showControls?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  quality?: 'low' | 'medium' | 'high';
}

export const Camera = forwardRef<CameraView, CameraProps>(
  (
    {
      style,
      onCapture,
      onClose,
      facing: initialFacing = 'back',
      enableTorch = true,
      showControls = true,
      aspectRatio = '4:3',
      quality = 'high',
    },
    ref
  ) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>(initialFacing);
    const [torch, setTorch] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Theme colors
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const primaryColor = useThemeColor({}, 'primary');
    const cardColor = useThemeColor({}, 'card');

    React.useImperativeHandle(ref, () => cameraRef.current as CameraView);

    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    const getCameraHeight = () => {
      switch (aspectRatio) {
        case '16:9':
          return (screenWidth * 9) / 16;
        case '1:1':
          return screenWidth;
        case '4:3':
        default:
          return (screenWidth * 4) / 3;
      }
    };

    const handleCapture = async () => {
      if (!cameraRef.current || isCapturing) return;

      try {
        setIsCapturing(true);
        const photo = await cameraRef.current.takePictureAsync({
          quality: quality === 'high' ? 1 : quality === 'medium' ? 0.7 : 0.3,
          base64: false,
          exif: false,
        });

        if (photo && onCapture) {
          onCapture(photo.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      } finally {
        setIsCapturing(false);
      }
    };

    const toggleCameraFacing = () => {
      setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const toggleTorch = () => {
      setTorch((current) => !current);
    };

    if (!permission) {
      return (
        <View style={[styles.container, { backgroundColor }, style]}>
          <ActivityIndicator size='large' color={primaryColor} />
          <Text style={[styles.loadingText, { color: textColor }]}>
            Loading camera...
          </Text>
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={[styles.container, { backgroundColor }, style]}>
          <View
            style={[styles.permissionContainer, { backgroundColor: cardColor }]}
          >
            <CameraIcon
              size={64}
              color={textColor}
              style={styles.permissionIcon}
            />
            <Text
              variant='title'
              style={[styles.permissionTitle, { color: textColor }]}
            >
              Camera Access Required
            </Text>
            <Text
              variant='body'
              style={[styles.permissionText, { color: textColor }]}
            >
              We need access to your camera to take photos
            </Text>
            <Button
              variant='default'
              size='lg'
              style={styles.permissionButton}
              onPress={requestPermission}
            >
              Grant Permission
            </Button>
          </View>
        </View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor, opacity: fadeAnim },
          style,
        ]}
      >
        <View style={[styles.cameraContainer, { height: getCameraHeight() }]}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            enableTorch={torch}
            animateShutter={true}
          >
            {showControls && (
              <>
                {/* Top Controls */}
                <View style={styles.topControls}>
                  {onClose && (
                    <TouchableOpacity
                      style={[
                        styles.controlButton,
                        { backgroundColor: cardColor },
                      ]}
                      onPress={onClose}
                      activeOpacity={0.7}
                    >
                      <X size={24} color={textColor} />
                    </TouchableOpacity>
                  )}
                  {enableTorch && facing === 'back' && (
                    <TouchableOpacity
                      style={[
                        styles.controlButton,
                        {
                          backgroundColor: torch ? primaryColor : cardColor,
                        },
                      ]}
                      onPress={toggleTorch}
                      activeOpacity={0.7}
                    >
                      {torch ? (
                        <Zap size={24} color={torch ? 'white' : textColor} />
                      ) : (
                        <ZapOff size={24} color={textColor} />
                      )}
                    </TouchableOpacity>
                  )}
                </View>

                {/* Bottom Controls */}
                <View style={styles.bottomControls}>
                  <TouchableOpacity
                    style={[
                      styles.controlButton,
                      { backgroundColor: cardColor },
                    ]}
                    onPress={toggleCameraFacing}
                    activeOpacity={0.7}
                  >
                    <SwitchCamera size={24} color={textColor} />
                  </TouchableOpacity>

                  {/* Capture Button */}
                  <TouchableOpacity
                    style={[
                      styles.captureButton,
                      {
                        backgroundColor: 'white',
                        borderColor: primaryColor,
                      },
                      isCapturing && styles.capturingButton,
                    ]}
                    onPress={handleCapture}
                    disabled={isCapturing}
                    activeOpacity={0.8}
                  >
                    {isCapturing ? (
                      <ActivityIndicator size='small' color={primaryColor} />
                    ) : (
                      <View
                        style={[
                          styles.captureInner,
                          { backgroundColor: primaryColor },
                        ]}
                      />
                    )}
                  </TouchableOpacity>

                  {/* Placeholder for symmetry */}
                  <View style={styles.controlButton} />
                </View>
              </>
            )}
          </CameraView>
        </View>
      </Animated.View>
    );
  }
);

Camera.displayName = 'Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: screenWidth,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  capturingButton: {
    transform: [{ scale: 0.9 }],
  },
  permissionContainer: {
    padding: 32,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    maxWidth: 320,
    marginHorizontal: 20,
  },
  permissionIcon: {
    marginBottom: 16,
  },
  permissionTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 24,
    fontSize: FONT_SIZE,
  },
  permissionButton: {
    minWidth: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: FONT_SIZE,
  },
});

export default Camera;
