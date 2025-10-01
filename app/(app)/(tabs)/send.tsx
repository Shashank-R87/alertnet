import AlertLoader from "@/components/AlertLoader";
import SendAlertComponent from "@/components/SendAlertComponent";
import { useAuth } from "@/context/AuthContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

type GeoStatus = "Inside" | "Outside" | "Checking..." | "Permission Denied";

const API_CHECK_ZONE =
  "https://dbsxbxyn12.execute-api.ap-south-1.amazonaws.com/findZone";
const INFURA_WS_URL = `wss://sepolia.infura.io/ws/v3/d78f0b4330ec4a16aafc769d03977a98`;

function haversine(
  p1: { lat: number; lon: number },
  p2: { lat: number; lon: number }
) {
  const R = 6371e3;
  const φ1 = (p1.lat * Math.PI) / 180;
  const φ2 = (p2.lat * Math.PI) / 180;
  const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
  const Δλ = ((p2.lon - p1.lon) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const fmt = (n?: number, d: number = 4) =>
  typeof n === "number" ? n.toFixed(d) : "--";

function useLocation() {
  const [permission, setPermission] = useState<
    Location.PermissionStatus | "unknown"
  >("unknown");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const subRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status !== "granted") return;

      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => setLocation(loc)
      );
      subRef.current = sub;
    })();

    return () => {
      subRef.current?.remove();
      subRef.current = null;
    };
  }, []);

  return { permission, location };
}

function useZone(location: Location.LocationObject | null) {
  const [zone, setZone] = useState<Zone | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const lastFetchAt = useRef<number>(0);
  const lastSent = useRef<{ lat: number; lon: number } | null>(null);

  const fetchZone = useCallback(
    async (lat: number, lon: number, force = false) => {
      const now = Date.now();
      const movedEnough =
        !lastSent.current || haversine({ lat, lon }, lastSent.current) >= 30; // 30m threshold
      const timeElapsed = now - lastFetchAt.current > 15000; // 15s throttle

      if (!force && !movedEnough && !timeElapsed) return;

      try {
        const res = await fetch(API_CHECK_ZONE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude: lat, longitude: lon }),
        });
        const data = await res.json();

        setZone({
          zoneName: data.zoneName ?? data.name ?? "Zone",
          contractAddress: data.contractAddress ?? data.contract_address,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          radius: Number(data.radius),
        });

        if (zone?.zoneName === "Zone") {
          setConnected(false);
        } else {
          setConnected(true);
        }

        lastFetchAt.current = now;
        lastSent.current = { lat, lon };
      } catch (e) {
        console.warn("Zone fetch failed:", e);
        setConnected(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!location?.coords) return;
    fetchZone(location.coords.latitude, location.coords.longitude);
  }, [location, fetchZone]);

  return { zone, refetch: fetchZone, connected };
}

function useGeofenceStatus(
  permission: Location.PermissionStatus | "unknown",
  location: Location.LocationObject | null,
  zone: Zone | null
) {
  const status: GeoStatus = useMemo(() => {
    if (permission === "unknown") return "Checking...";
    if (permission !== "granted") return "Permission Denied";
    if (!location || !zone) return "Checking...";
    const d = haversine(
      { lat: location.coords.latitude, lon: location.coords.longitude },
      { lat: zone.latitude, lon: zone.longitude }
    );
    return d < (zone.radius ?? 0) ? "Inside" : "Outside";
  }, [permission, location, zone]);

  return status;
}

function Send() {
  const { user } = useAuth();
  const { permission, location } = useLocation();
  const { zone, refetch, connected } = useZone(location);
  const status = useGeofenceStatus(permission, location, zone);

  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setComponentKey((prevKey) => prevKey + 1);
    setRefreshing(false);
  }, []);

  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Notification permission not granted!");
      }
    })();
  }, []);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView className="flex-1 justify-start gap-6 p-8 bg-white">
      {/* TODO: Header */}
      <View className="w-full flex justify-between flex-row items-center">
        <View className="flex flex-row justify-end items-end gap-4">
          <Image
            source={require("@/assets/images/main-logo.png")}
            style={styles.logo}
          />
          <View className="flex justify-start items-start gap-1">
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-3xl font-medium"
            >
              AlertNet
            </Text>
            <View className="flex flex-row justify-start items-center gap-2">
              <Text
                style={{ fontFamily: "Poppins_400Regular" }}
                className="text-sm"
              >{`Connecting drivers, securing roads.`}</Text>
            </View>
          </View>
        </View>
        <Link href={"/profile"}>
          <View className="flex justify-center items-end flex-1 self-center">
            <Image
              source={{
                uri:
                  user?.photo ??
                  "https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image",
              }}
              style={styles.profilePhoto}
            />
          </View>
        </Link>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: tabBarHeight,
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 20,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* TODO: Sending Alerts */}
          <View className="flex flex-col w-full gap-0 bg-white rounded-xl relative">
          <View className="self-end bg-[#F3F4F6] px-4 pt-3 pb-1 rounded-t-xl relative top-1 flex flex-row justify-start items-center gap-2">
            <View
              className={`w-2 h-2 rounded-3xl ${connected ? "bg-green-400" : "bg-red-500"}`}
            ></View>
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-base"
            >
              {connected ? "Connected" : "Disconnected"}
            </Text>
          </View>
          <View
            key={componentKey}
            className="flex flex-col flex-1 justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-2"
          >
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-2xl"
            >
              Send Alerts
            </Text>
            <View className="flex flex-col justify-center items-center gap-2 w-full pt-2">
              {!connected ? (
                <AlertLoader listening={connected} />
              ) : (
                <SendAlertComponent
                  location={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                  }}
                  contractAddress={zone?.contractAddress ?? ""}
                  zoneNumber={parseInt(
                    String(zone?.zoneName).replace(/[^0-9]/g, ""),
                    10
                  )}
                />
              )}
            </View>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LinearGradient
        style={styles.fadeOverlay}
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        pointerEvents={"none"}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profilePhoto: { width: 32, height: 32, borderRadius: 50 },
  logo: { width: 58, height: 58 },
  expand: { width: 22, height: 22 },
  fadeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  mapPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // Match your card background color
    borderRadius: 12,
  },
  gridContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});

export default Send;
