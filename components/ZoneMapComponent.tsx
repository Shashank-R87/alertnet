import MapLibreGL from "@maplibre/maplibre-react-native";
import * as turf from "@turf/turf";
import { formatDistanceToNow } from "date-fns";
import * as Location from "expo-location";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Zone = {
  zoneName: string;
  contractAddress: string;
  latitude: number;
  longitude: number;
  radius: number;
};

type Alert = {
  zoneNumber: number;
  message: string;
  numberPlate: string;
  make: string;
  model: string;
  wtc: string;
  latitude: number;
  longitude: number;
  timestampMillis: number;
};

type ZoneMapProps = {
  location: Location.LocationObject | null;
  zone: Zone | null;
  enableInteraction: boolean;
  alerts: Alert[];
};

const ZoneMapComponent = ({
  location,
  zone,
  enableInteraction,
  alerts,
}: ZoneMapProps) => {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const center: [number, number] = [
    zone?.longitude || 77.5946,
    zone?.latitude || 12.9716,
  ]; // [lng, lat]
  const user: [number, number] = [
    location?.coords.longitude || 77.5946,
    location?.coords.latitude || 12.9716,
  ];

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
        onPress={() => setSelectedAlertId(null)}
      >
        <MapLibreGL.Camera
          centerCoordinate={center}
          zoomLevel={enableInteraction ? 17 : 14}
        />

        <MapLibreGL.ShapeSource id="geofence" shape={circle}>
          <MapLibreGL.FillLayer
            id="geofenceFill"
            style={{ fillColor: "rgba(0,150,255,0.3)" }}
          />
        </MapLibreGL.ShapeSource>

        <MapLibreGL.PointAnnotation id="user" coordinate={user}>
          <View style={styles.userMarker} />
        </MapLibreGL.PointAnnotation>

        {alerts &&
          alerts.length > 0 &&
          alerts.map((alert) => {

            const timeAgo = formatDistanceToNow(
              new Date(Number(alert.timestampMillis)),
              {
                addSuffix: true,
              }
            );

            return (
              <MapLibreGL.PointAnnotation
                key={alert.timestampMillis}
                id={alert.timestampMillis.toString()}
                coordinate={[alert.longitude, alert.latitude]}
              >
                <View style={styles.alertMarker} />
                <MapLibreGL.Callout>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{alert.numberPlate}</Text>
                    <Text style={styles.calloutText}>{alert.message}</Text>
                    <Text style={styles.calloutText}>{timeAgo}</Text>
                  </View>
                </MapLibreGL.Callout>
              </MapLibreGL.PointAnnotation>
            );
          })}
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  userMarker: {
    width: 14,
    height: 14,
    borderRadius: 100,
    backgroundColor: "rgba(0, 122, 255, 0.9)",
    borderColor: "white",
    borderWidth: 2,
  },
  alertMarker: {
    width: 14,
    height: 14,
    borderRadius: 100,
    backgroundColor: "rgba(255, 59, 48, 0.9)",
    borderColor: "white",
    borderWidth: 2,
  },
  calloutContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    width: 200,
    marginBottom: 5,
    borderColor: "rgba(255, 59, 48, 0.9)",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: "flex",
    gap: 4,
    justifyContent: "center",
    alignContent: "center",
  },
  calloutTitle: {
    fontFamily: "Poppins_500Medium",
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  calloutText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#555",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ZoneMapComponent;
