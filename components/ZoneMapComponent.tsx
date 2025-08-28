import * as Location from 'expo-location';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker, UrlTile } from 'react-native-maps';

type Zone = {
  zoneName: string;
  contractAddress: string;
  latitude: number;
  longitude: number;
  radius: number;
};

type ZoneMapProps = {
  location: Location.LocationObject | null;
  zone: Zone | null;
  enableInteraction: boolean
};

const ZoneMapComponent = ({ location, zone, enableInteraction }: ZoneMapProps) => {
  const mapRef = React.useRef<MapView>(null);

  const initialRegion = {
    latitude: zone?.latitude || 12.9716,
    longitude: zone?.longitude || 77.5946,
    latitudeDelta: enableInteraction ? 0.002 : 0.003,
    longitudeDelta: enableInteraction ? 0.002 : 0.003,
  };

  return (
    <View style={{ borderRadius: enableInteraction ? 0 : 10 }} className={`w-full ${enableInteraction ? 'h-full' : 'aspect-square'} bg-[#E5E7EB] overflow-hidden`}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={false}
        scrollEnabled={enableInteraction}
        zoomEnabled={enableInteraction}
        rotateEnabled={enableInteraction}
      >
        <UrlTile
          urlTemplate="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
          maximumZ={19}
        />

        {zone && zone.radius > 0 && (
          <Circle
            center={{ latitude: zone.latitude, longitude: zone.longitude }}
            radius={zone.radius}
            strokeColor="rgba(0, 150, 255, 0.7)"
            fillColor="rgba(0, 150, 255, 0.2)"
          />
        )}

        {location?.coords && (
          <Marker coordinate={location.coords} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.userMarker} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  userMarker: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    borderColor: 'white',
    borderWidth: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ZoneMapComponent;
