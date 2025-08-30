import MapLibreGL from "@maplibre/maplibre-react-native";
import * as turf from "@turf/turf";
import * as Location from "expo-location";
import React from "react";
import { StyleSheet, View } from "react-native";

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
  enableInteraction: boolean;
};

const ZoneMapComponent = ({
  location,
  zone,
  enableInteraction,
}: ZoneMapProps) => {

  const center: [number, number] = [zone?.longitude || 77.5946, zone?.latitude || 12.9716,]; // [lng, lat]
  const user: [number, number] = [location?.coords.longitude || 77.5946, location?.coords.latitude || 12.9716];

  const circle = turf.circle(center, (zone?.radius || 100) / 1000, {
    steps: 64,
    units: "kilometers",
  });

  return (
    <View
      style={{ borderRadius: enableInteraction ? 0 : 10 }}
      className={`w-full ${enableInteraction ? "h-full" : "aspect-square"} bg-[#E5E7EB] overflow-hidden`}
    >
      <MapLibreGL.MapView
        style={[{ flex: 1 }, styles.map]}
        mapStyle={require("./simple-style.json")}
        logoEnabled={enableInteraction}
        scrollEnabled={enableInteraction}
        rotateEnabled={enableInteraction}
        zoomEnabled={enableInteraction}
      >
        <MapLibreGL.Camera centerCoordinate={center} zoomLevel={14} />

        <MapLibreGL.ShapeSource id="geofence" shape={circle}>
          <MapLibreGL.FillLayer
            id="geofenceFill"
            style={{ fillColor: "rgba(0,150,255,0.3)" }}
          />
        </MapLibreGL.ShapeSource>

        <MapLibreGL.PointAnnotation id="user" coordinate={user}>
          <View
            style={styles.userMarker}
          />
        </MapLibreGL.PointAnnotation>
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  userMarker: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    borderColor: "white",
    borderWidth: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ZoneMapComponent;
