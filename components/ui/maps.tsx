import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import * as Location from 'expo-location';
import {
  Crosshair,
  Layers,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import MapView, {
  Callout,
  Circle,
  LatLng,
  MapPressEvent,
  Marker,
  MarkerPressEvent,
  Polygon,
  Polyline,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Types
export interface MapMarker {
  id: string;
  coordinate: LatLng;
  title?: string;
  description?: string;
  color?: string;
  icon?: React.ComponentType<any>;
  onPress?: () => void;
}

export interface MapPolyline {
  id: string;
  coordinates: LatLng[];
  strokeColor?: string;
  strokeWidth?: number;
  lineDashPattern?: number[];
}

export interface MapPolygon {
  id: string;
  coordinates: LatLng[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface MapCircle {
  id: string;
  center: LatLng;
  radius: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}

export type MapType = 'standard' | 'satellite' | 'hybrid' | 'terrain';

export interface MapsProps {
  // Basic props
  style?: ViewStyle;
  initialRegion?: Region;
  region?: Region;
  onRegionChange?: (region: Region) => void;
  onRegionChangeComplete?: (region: Region) => void;

  // Map type and provider
  mapType?: MapType;
  provider?: typeof PROVIDER_GOOGLE | typeof PROVIDER_DEFAULT;

  // Markers and overlays
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  polygons?: MapPolygon[];
  circles?: MapCircle[];

  // Interaction
  onMapPress?: (event: MapPressEvent) => void;
  onMarkerPress?: (marker: MapMarker, event: MarkerPressEvent) => void;
  scrollEnabled?: boolean;
  zoomEnabled?: boolean;
  rotateEnabled?: boolean;
  pitchEnabled?: boolean;

  // Location
  showUserLocation?: boolean;
  followUserLocation?: boolean;
  showCompass?: boolean;

  // UI Controls
  showControls?: boolean;
  showMapTypeSelector?: boolean;
  showZoomControls?: boolean;
  showLocationButton?: boolean;
  showResetButton?: boolean;

  // Styling
  lightColor?: string;
  darkColor?: string;
  customMapStyle?: any[];

  // Loading
  loading?: boolean;
  loadingText?: string;
}

export const Maps = forwardRef<MapView, MapsProps>(
  (
    {
      style,
      initialRegion,
      region,
      onRegionChange,
      onRegionChangeComplete,
      mapType = 'standard',
      provider = Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT,
      markers = [],
      polylines = [],
      polygons = [],
      circles = [],
      onMapPress,
      onMarkerPress,
      scrollEnabled = true,
      zoomEnabled = true,
      rotateEnabled = true,
      pitchEnabled = true,
      showUserLocation = false,
      followUserLocation = false,
      showCompass = false,
      showControls = true,
      showMapTypeSelector = true,
      showZoomControls = true,
      showLocationButton = true,
      showResetButton = true,
      lightColor,
      darkColor,
      customMapStyle,
      loading = false,
      loadingText = 'Loading map...',
      ...props
    },
    ref
  ) => {
    // Theme colors
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      'background'
    );
    const cardColor = useThemeColor({}, 'card');
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');
    const borderColor = useThemeColor({}, 'border');
    const mutedColor = useThemeColor({}, 'textMuted');

    // State
    const [currentMapType, setCurrentMapType] = useState<MapType>(mapType);
    const [userLocation, setUserLocation] = useState<LatLng | null>(null);
    const [locationPermission, setLocationPermission] =
      useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(loading);

    const mapRef = useRef<MapView>(null);

    // Default region (Cairo, Egypt based on user location)
    const defaultRegion: Region = {
      latitude: 30.0444,
      longitude: 31.2357,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    // Location permission and setup
    useEffect(() => {
      if (showUserLocation || followUserLocation) {
        requestLocationPermission();
      }
    }, [showUserLocation, followUserLocation]);

    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setLocationPermission(true);
          getCurrentLocation();
        } else {
          setLocationPermission(false);
          Alert.alert(
            'Location Permission',
            'Location permission is required to show your location on the map.'
          );
        }
      } catch (error) {
        console.error('Error requesting location permission:', error);
        setLocationPermission(false);
      }
    };

    const getCurrentLocation = async () => {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(coords);

        if (followUserLocation && mapRef.current) {
          mapRef.current.animateToRegion({
            ...coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    };

    // Map controls
    const handleZoomIn = useCallback(() => {
      if (mapRef.current) {
        mapRef.current.getCamera().then((camera) => {
          if (camera.zoom !== undefined) {
            mapRef.current?.animateCamera({ zoom: camera.zoom + 1 });
          }
        });
      }
    }, []);

    const handleZoomOut = useCallback(() => {
      if (mapRef.current) {
        mapRef.current.getCamera().then((camera) => {
          if (camera.zoom !== undefined) {
            mapRef.current?.animateCamera({ zoom: camera.zoom - 1 });
          }
        });
      }
    }, []);

    const handleResetView = useCallback(() => {
      if (mapRef.current) {
        const targetRegion = initialRegion || defaultRegion;
        mapRef.current.animateToRegion(targetRegion);
      }
    }, [initialRegion]);

    const handleMyLocationPress = useCallback(() => {
      if (locationPermission && userLocation && mapRef.current) {
        mapRef.current.animateToRegion({
          ...userLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else if (!locationPermission) {
        requestLocationPermission();
      }
    }, [locationPermission, userLocation]);

    const handleMapTypeChange = useCallback(() => {
      const types: MapType[] = ['standard', 'satellite', 'hybrid', 'terrain'];
      const currentIndex = types.indexOf(currentMapType);
      const nextIndex = (currentIndex + 1) % types.length;
      setCurrentMapType(types[nextIndex]);
    }, [currentMapType]);

    const handleMarkerPress = useCallback(
      (marker: MapMarker, event: MarkerPressEvent) => {
        if (marker.onPress) {
          marker.onPress();
        }
        if (onMarkerPress) {
          onMarkerPress(marker, event);
        }
      },
      [onMarkerPress]
    );

    // Render loading state
    if (isLoading) {
      return (
        <View style={[styles.container, { backgroundColor }, style]}>
          <View style={styles.loadingContainer}>
            <Text variant='body' style={{ color: mutedColor }}>
              {loadingText}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container, style]}>
        <MapView
          ref={(mapViewRef) => {
            if (typeof ref === 'function') {
              ref(mapViewRef);
            } else if (ref) {
              ref.current = mapViewRef;
            }
            mapRef.current = mapViewRef;
          }}
          style={styles.map}
          provider={provider}
          mapType={currentMapType}
          initialRegion={initialRegion || defaultRegion}
          region={region}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChangeComplete}
          onPress={onMapPress}
          scrollEnabled={scrollEnabled}
          zoomEnabled={zoomEnabled}
          rotateEnabled={rotateEnabled}
          pitchEnabled={pitchEnabled}
          showsUserLocation={showUserLocation && locationPermission}
          showsMyLocationButton={false}
          showsCompass={showCompass}
          customMapStyle={customMapStyle}
          {...props}
        >
          {/* Markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              pinColor={marker.color}
              onPress={(event) => handleMarkerPress(marker, event)}
            >
              {marker.icon && (
                <View
                  style={[styles.customMarker, { backgroundColor: cardColor }]}
                >
                  <marker.icon size={20} color={marker.color || primaryColor} />
                </View>
              )}
              {(marker.title || marker.description) && (
                <Callout>
                  <View style={styles.callout}>
                    {marker.title && (
                      <Text variant='subtitle' style={{ color: textColor }}>
                        {marker.title}
                      </Text>
                    )}
                    {marker.description && (
                      <Text variant='body' style={{ color: mutedColor }}>
                        {marker.description}
                      </Text>
                    )}
                  </View>
                </Callout>
              )}
            </Marker>
          ))}

          {/* Polylines */}
          {polylines.map((polyline) => (
            <Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor={polyline.strokeColor || primaryColor}
              strokeWidth={polyline.strokeWidth || 3}
              lineDashPattern={polyline.lineDashPattern}
            />
          ))}

          {/* Polygons */}
          {polygons.map((polygon) => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              fillColor={polygon.fillColor || `${primaryColor}33`}
              strokeColor={polygon.strokeColor || primaryColor}
              strokeWidth={polygon.strokeWidth || 2}
            />
          ))}

          {/* Circles */}
          {circles.map((circle) => (
            <Circle
              key={circle.id}
              center={circle.center}
              radius={circle.radius}
              fillColor={circle.fillColor || `${primaryColor}33`}
              strokeColor={circle.strokeColor || primaryColor}
              strokeWidth={circle.strokeWidth || 2}
            />
          ))}
        </MapView>

        {/* Controls */}
        {showControls && (
          <View
            style={[styles.controlsContainer, { backgroundColor: cardColor }]}
          >
            {/* Map Type Selector */}
            {showMapTypeSelector && (
              <Button
                variant='ghost'
                size='icon'
                icon={Layers}
                onPress={handleMapTypeChange}
                style={styles.controlButton}
              >
                {currentMapType.charAt(0).toUpperCase() +
                  currentMapType.slice(1)}
              </Button>
            )}

            {/* Zoom Controls */}
            {showZoomControls && (
              <View style={styles.zoomControls}>
                <Button
                  variant='ghost'
                  size='icon'
                  icon={ZoomIn}
                  onPress={handleZoomIn}
                  style={styles.controlButton}
                >
                  +
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  icon={ZoomOut}
                  onPress={handleZoomOut}
                  style={styles.controlButton}
                >
                  -
                </Button>
              </View>
            )}

            {/* Location Button */}
            {showLocationButton && (
              <Button
                variant='ghost'
                size='icon'
                icon={Crosshair}
                onPress={handleMyLocationPress}
                style={[
                  styles.controlButton,
                  { opacity: !locationPermission ? 0.5 : 1 },
                ]}
              >
                📍
              </Button>
            )}

            {/* Reset Button */}
            {showResetButton && (
              <Button
                variant='ghost'
                size='icon'
                icon={RotateCcw}
                onPress={handleResetView}
                style={styles.controlButton}
              >
                ↺
              </Button>
            )}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    borderRadius: CORNERS,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButton: {
    marginVertical: 4,
    width: 40,
    height: 40,
  },
  zoomControls: {
    marginVertical: 8,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  callout: {
    minWidth: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

Maps.displayName = 'Maps';
