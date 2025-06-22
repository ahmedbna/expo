import { Button } from '@/components/ui/button';
import { MapMarker, MapPolyline, Maps } from '@/components/ui/maps'; // Your custom Maps component
import { useThemeColor } from '@/hooks/useThemeColor';
import { CORNERS } from '@/theme/globals';
import * as Location from 'expo-location';
import {
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Star,
  User,
  X,
} from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = height * 0.4;

// Mock data for demonstration
const MOCK_DRIVERS = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    rating: 4.8,
    eta: '3 min',
    distance: '0.2 km',
    car: 'Toyota Camry',
    plate: 'ABC 123',
    coordinate: { latitude: 30.0444, longitude: 31.2357 },
    heading: 45,
  },
  {
    id: '2',
    name: 'Mohamed Ali',
    rating: 4.9,
    eta: '5 min',
    distance: '0.5 km',
    car: 'Honda Civic',
    plate: 'XYZ 789',
    coordinate: { latitude: 30.0454, longitude: 31.2367 },
    heading: 120,
  },
];

const MOCK_SUGGESTIONS = [
  {
    id: '1',
    title: 'Home',
    subtitle: 'New Cairo, Egypt',
    coordinate: { latitude: 30.0444, longitude: 31.2357 },
  },
  {
    id: '2',
    title: 'Work',
    subtitle: 'Downtown Cairo',
    coordinate: { latitude: 30.0626, longitude: 31.2497 },
  },
  {
    id: '3',
    title: 'Cairo Festival City',
    subtitle: 'Shopping Mall',
    coordinate: { latitude: 30.0254, longitude: 31.4014 },
  },
  {
    id: '4',
    title: 'Cairo Airport',
    subtitle: 'Terminal 1',
    coordinate: { latitude: 30.1219, longitude: 31.4056 },
  },
];

const MOCK_ROUTE = [
  { latitude: 30.0444, longitude: 31.2357 },
  { latitude: 30.0454, longitude: 31.2367 },
  { latitude: 30.0464, longitude: 31.2377 },
  { latitude: 30.0474, longitude: 31.2387 },
  { latitude: 30.0484, longitude: 31.2397 },
  { latitude: 30.0494, longitude: 31.2407 },
  { latitude: 30.0504, longitude: 31.2417 },
];

type RideState =
  | 'idle'
  | 'selecting-pickup'
  | 'selecting-dropoff'
  | 'searching'
  | 'driver-found'
  | 'driver-arriving'
  | 'in-ride'
  | 'completed';

interface UberMapProps {
  onRideRequest?: (pickup: any, dropoff: any) => void;
  onRideCancel?: () => void;
}

export const UberMap: React.FC<UberMapProps> = ({
  onRideRequest,
  onRideCancel,
}) => {
  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const textColor = useThemeColor({}, 'text');
  const mutedColor = useThemeColor({}, 'textMuted');
  const borderColor = useThemeColor({}, 'border');

  // State
  const [rideState, setRideState] = useState<RideState>('idle');
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [drivers, setDrivers] = useState(MOCK_DRIVERS);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'pickup' | 'dropoff'>('pickup');
  const [route, setRoute] = useState<MapPolyline[]>([]);

  // Bottom sheet animation
  const bottomSheetAnimation = useRef(new Animated.Value(0)).current;
  const [bottomSheetHeight, setBottomSheetHeight] = useState(200);

  // Map ref
  const mapRef = useRef(null);

  // Get current location on mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Update driver positions (simulate real-time updates)
  useEffect(() => {
    if (rideState === 'driver-arriving' || rideState === 'in-ride') {
      const interval = setInterval(() => {
        setDrivers((prev) =>
          prev.map((driver) => ({
            ...driver,
            coordinate: {
              latitude:
                driver.coordinate.latitude + (Math.random() - 0.5) * 0.001,
              longitude:
                driver.coordinate.longitude + (Math.random() - 0.5) * 0.001,
            },
          }))
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rideState]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCurrentLocation(coords);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      // Fallback to Cairo coordinates
      setCurrentLocation({ latitude: 30.0444, longitude: 31.2357 });
    }
  };

  const handleMapPress = useCallback(
    (event) => {
      const coordinate = event.nativeEvent.coordinate;

      if (rideState === 'selecting-pickup') {
        setPickupLocation(coordinate);
        setRideState('idle');
      } else if (rideState === 'selecting-dropoff') {
        setDropoffLocation(coordinate);
        setRideState('idle');
      }
    },
    [rideState]
  );

  const handleLocationSearch = (location) => {
    if (searchType === 'pickup') {
      setPickupLocation(location.coordinate);
    } else {
      setDropoffLocation(location.coordinate);
    }
    setShowLocationSearch(false);
    setSearchQuery('');
  };

  const requestRide = () => {
    if (!pickupLocation || !dropoffLocation) {
      Alert.alert(
        'Missing Location',
        'Please select both pickup and dropoff locations'
      );
      return;
    }

    setRideState('searching');
    animateBottomSheet(300);

    // Simulate finding driver
    setTimeout(() => {
      setSelectedDriver(MOCK_DRIVERS[0]);
      setRideState('driver-found');
      setRoute([
        {
          id: 'route',
          coordinates: MOCK_ROUTE,
          strokeColor: primaryColor,
          strokeWidth: 4,
        },
      ]);
      animateBottomSheet(400);
    }, 3000);
  };

  const cancelRide = () => {
    setRideState('idle');
    setSelectedDriver(null);
    setRoute([]);
    animateBottomSheet(200);
    onRideCancel?.();
  };

  const acceptRide = () => {
    setRideState('driver-arriving');
    animateBottomSheet(350);

    // Simulate driver arrival
    setTimeout(() => {
      setRideState('in-ride');
      animateBottomSheet(250);
    }, 10000);
  };

  const completeRide = () => {
    setRideState('completed');
    animateBottomSheet(300);

    setTimeout(() => {
      setRideState('idle');
      setPickupLocation(null);
      setDropoffLocation(null);
      setSelectedDriver(null);
      setRoute([]);
      animateBottomSheet(200);
    }, 5000);
  };

  const animateBottomSheet = (toValue) => {
    Animated.spring(bottomSheetAnimation, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  // Create markers for map
  const getMapMarkers = (): MapMarker[] => {
    const markers: MapMarker[] = [];

    // Current location
    if (currentLocation) {
      markers.push({
        id: 'current',
        coordinate: currentLocation,
        title: 'Your Location',
        color: '#007AFF',
      });
    }

    // Pickup location
    if (pickupLocation) {
      markers.push({
        id: 'pickup',
        coordinate: pickupLocation,
        title: 'Pickup Location',
        color: '#34C759',
      });
    }

    // Dropoff location
    if (dropoffLocation) {
      markers.push({
        id: 'dropoff',
        coordinate: dropoffLocation,
        title: 'Dropoff Location',
        color: '#FF3B30',
      });
    }

    // Drivers
    if (
      rideState === 'searching' ||
      rideState === 'driver-found' ||
      rideState === 'driver-arriving'
    ) {
      drivers.forEach((driver) => {
        markers.push({
          id: `driver-${driver.id}`,
          coordinate: driver.coordinate,
          title: driver.name,
          description: `${driver.car} • ${driver.plate}`,
          color: '#FFD60A',
        });
      });
    }

    return markers;
  };

  const renderBottomSheet = () => {
    return (
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            backgroundColor: cardColor,
            height: bottomSheetAnimation,
          },
        ]}
      >
        <View
          style={[styles.bottomSheetHandle, { backgroundColor: mutedColor }]}
        />

        {rideState === 'idle' && (
          <View style={styles.bottomSheetContent}>
            <Text style={[styles.title, { color: textColor }]}>Where to?</Text>

            <TouchableOpacity
              style={[styles.locationInput, { borderColor }]}
              onPress={() => {
                setSearchType('pickup');
                setShowLocationSearch(true);
              }}
            >
              <MapPin size={20} color={mutedColor} />
              <Text
                style={[
                  styles.locationText,
                  { color: pickupLocation ? textColor : mutedColor },
                ]}
              >
                {pickupLocation
                  ? 'Pickup location selected'
                  : 'Choose pickup location'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.locationInput, { borderColor }]}
              onPress={() => {
                setSearchType('dropoff');
                setShowLocationSearch(true);
              }}
            >
              <Navigation size={20} color={mutedColor} />
              <Text
                style={[
                  styles.locationText,
                  { color: dropoffLocation ? textColor : mutedColor },
                ]}
              >
                {dropoffLocation ? 'Dropoff location selected' : 'Where to?'}
              </Text>
            </TouchableOpacity>

            <Button
              onPress={requestRide}
              disabled={!pickupLocation || !dropoffLocation}
              style={[styles.requestButton, { backgroundColor: primaryColor }]}
            >
              <Text style={styles.requestButtonText}>Request Ride</Text>
            </Button>
          </View>
        )}

        {rideState === 'searching' && (
          <View style={styles.bottomSheetContent}>
            <Text style={[styles.title, { color: textColor }]}>
              Finding your ride...
            </Text>
            <Text style={[styles.subtitle, { color: mutedColor }]}>
              We're matching you with nearby drivers
            </Text>
            <Button
              variant='outline'
              onPress={cancelRide}
              style={styles.cancelButton}
            >
              <Text>Cancel</Text>
            </Button>
          </View>
        )}

        {rideState === 'driver-found' && selectedDriver && (
          <View style={styles.bottomSheetContent}>
            <Text style={[styles.title, { color: textColor }]}>
              Driver Found!
            </Text>

            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <User size={30} color={textColor} />
              </View>
              <View style={styles.driverDetails}>
                <Text style={[styles.driverName, { color: textColor }]}>
                  {selectedDriver.name}
                </Text>
                <View style={styles.driverMeta}>
                  <Star size={16} color='#FFD60A' />
                  <Text style={[styles.rating, { color: mutedColor }]}>
                    {selectedDriver.rating}
                  </Text>
                  <Text style={[styles.carInfo, { color: mutedColor }]}>
                    • {selectedDriver.car}
                  </Text>
                </View>
                <Text style={[styles.eta, { color: primaryColor }]}>
                  Arrives in {selectedDriver.eta}
                </Text>
              </View>
              <View style={styles.driverActions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: primaryColor },
                  ]}
                >
                  <Phone size={20} color='white' />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: primaryColor },
                  ]}
                >
                  <MessageCircle size={20} color='white' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <Button
                variant='outline'
                onPress={cancelRide}
                style={[styles.actionButtonLarge, { flex: 1, marginRight: 8 }]}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                onPress={acceptRide}
                style={[
                  styles.actionButtonLarge,
                  { flex: 1, marginLeft: 8, backgroundColor: primaryColor },
                ]}
              >
                <Text style={{ color: 'white' }}>Accept</Text>
              </Button>
            </View>
          </View>
        )}

        {rideState === 'driver-arriving' && selectedDriver && (
          <View style={styles.bottomSheetContent}>
            <Text style={[styles.title, { color: textColor }]}>
              {selectedDriver.name} is on the way
            </Text>
            <Text style={[styles.subtitle, { color: mutedColor }]}>
              {selectedDriver.car} • {selectedDriver.plate}
            </Text>
            <Text style={[styles.eta, { color: primaryColor }]}>
              Arriving in {selectedDriver.eta}
            </Text>

            <View style={styles.buttonRow}>
              <Button
                variant='outline'
                onPress={cancelRide}
                style={[styles.actionButtonLarge, { flex: 1, marginRight: 8 }]}
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                onPress={() => {}}
                style={[
                  styles.actionButtonLarge,
                  { flex: 1, marginLeft: 8, backgroundColor: primaryColor },
                ]}
              >
                <Text style={{ color: 'white' }}>Contact Driver</Text>
              </Button>
            </View>
          </View>
        )}

        {rideState === 'in-ride' && selectedDriver && (
          <View style={styles.bottomSheetContent}>
            <Text style={[styles.title, { color: textColor }]}>
              Trip in Progress
            </Text>
            <Text style={[styles.subtitle, { color: mutedColor }]}>
              {selectedDriver.name} • {selectedDriver.car}
            </Text>

            <Button
              onPress={completeRide}
              style={[styles.requestButton, { backgroundColor: '#34C759' }]}
            >
              <Text style={styles.requestButtonText}>End Trip</Text>
            </Button>
          </View>
        )}

        {rideState === 'completed' && (
          <View style={styles.bottomSheetContent}>
            <Text style={[styles.title, { color: textColor }]}>
              Trip Completed!
            </Text>
            <Text style={[styles.subtitle, { color: mutedColor }]}>
              Thank you for riding with us
            </Text>

            <View style={styles.ratingContainer}>
              <Text style={[styles.ratingText, { color: textColor }]}>
                Rate your trip
              </Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star}>
                    <Star size={30} color='#FFD60A' />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Maps
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 30.0444,
          longitude: currentLocation?.longitude || 31.2357,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        markers={getMapMarkers()}
        polylines={route}
        onMapPress={handleMapPress}
        showUserLocation={true}
        showControls={true}
        showLocationButton={true}
      />

      {/* Location Selection Buttons */}
      {(rideState === 'idle' ||
        rideState === 'selecting-pickup' ||
        rideState === 'selecting-dropoff') && (
        <View style={[styles.selectionButtons, { backgroundColor: cardColor }]}>
          <Button
            variant={rideState === 'selecting-pickup' ? 'default' : 'outline'}
            onPress={() =>
              setRideState(
                rideState === 'selecting-pickup' ? 'idle' : 'selecting-pickup'
              )
            }
            style={styles.selectionButton}
          >
            <Text>
              {rideState === 'selecting-pickup' ? 'Cancel' : 'Select Pickup'}
            </Text>
          </Button>
          <Button
            variant={rideState === 'selecting-dropoff' ? 'default' : 'outline'}
            onPress={() =>
              setRideState(
                rideState === 'selecting-dropoff' ? 'idle' : 'selecting-dropoff'
              )
            }
            style={styles.selectionButton}
          >
            <Text>
              {rideState === 'selecting-dropoff' ? 'Cancel' : 'Select Dropoff'}
            </Text>
          </Button>
        </View>
      )}

      {renderBottomSheet()}

      {/* Location Search Modal */}
      <Modal
        visible={showLocationSearch}
        animationType='slide'
        presentationStyle='pageSheet'
      >
        <View style={[styles.modalContainer, { backgroundColor }]}>
          <View
            style={[styles.modalHeader, { borderBottomColor: borderColor }]}
          >
            <Text style={[styles.modalTitle, { color: textColor }]}>
              Choose {searchType} location
            </Text>
            <TouchableOpacity
              onPress={() => setShowLocationSearch(false)}
              style={styles.closeButton}
            >
              <X size={24} color={textColor} />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.searchContainer, { backgroundColor: cardColor }]}
          >
            <Search size={20} color={mutedColor} />
            <TextInput
              style={[styles.searchInput, { color: textColor }]}
              placeholder='Search for a place...'
              placeholderTextColor={mutedColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView style={styles.suggestionsList}>
            {MOCK_SUGGESTIONS.map((suggestion) => (
              <TouchableOpacity
                key={suggestion.id}
                style={[
                  styles.suggestionItem,
                  { borderBottomColor: borderColor },
                ]}
                onPress={() => handleLocationSearch(suggestion)}
              >
                <MapPin size={20} color={mutedColor} />
                <View style={styles.suggestionText}>
                  <Text style={[styles.suggestionTitle, { color: textColor }]}>
                    {suggestion.title}
                  </Text>
                  <Text
                    style={[styles.suggestionSubtitle, { color: mutedColor }]}
                  >
                    {suggestion.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  selectionButtons: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    borderRadius: CORNERS,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectionButton: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  bottomSheetContent: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: CORNERS,
    marginBottom: 12,
    gap: 12,
  },
  locationText: {
    fontSize: 16,
    flex: 1,
  },
  requestButton: {
    paddingVertical: 16,
    borderRadius: CORNERS,
    marginTop: 16,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  driverMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  rating: {
    fontSize: 14,
  },
  carInfo: {
    fontSize: 14,
  },
  eta: {
    fontSize: 16,
    fontWeight: '600',
  },
  driverActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButtonLarge: {
    paddingVertical: 12,
    borderRadius: CORNERS,
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: CORNERS,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  suggestionsList: {
    flex: 1,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    gap: 16,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  suggestionSubtitle: {
    fontSize: 14,
  },
});
