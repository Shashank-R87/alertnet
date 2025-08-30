<<<<<<< HEAD
import AlertCard from "@/components/AlertCard";
import AlertLoader from "@/components/AlertLoader";
import ZoneMapComponent from "@/components/ZoneMapComponent";
import { useAuth } from "@/context/AuthContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ethers } from "ethers";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
=======
import AlertCard from '@/components/AlertCard';
import AlertLoader from '@/components/AlertLoader';
import ZoneMapComponent from '@/components/ZoneMapComponent';
import { useAuth } from '@/context/AuthContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ethers } from "ethers";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as Notifications from "expo-notifications";
import { Link } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
import contractJson from "../../../lib/ZoneAlert.json";

type Zone = {
  zoneName: string;
  contractAddress: string;
  latitude: number;
  longitude: number;
<<<<<<< HEAD
  radius: number;
=======
  radius: number
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
};

type Alert = {
  zoneNumber: number;
  message: string;
  numberPlate: string;
  make: string;
  model: string;
  wtc: string;
};

type GeoStatus = "Inside" | "Outside" | "Checking..." | "Permission Denied";

<<<<<<< HEAD
const API_CHECK_ZONE =
  "https://dbsxbxyn12.execute-api.ap-south-1.amazonaws.com/findZone";
const INFURA_WS_URL = `wss://sepolia.infura.io/ws/v3/d78f0b4330ec4a16aafc769d03977a98`;

function haversine(
  p1: { lat: number; lon: number },
  p2: { lat: number; lon: number }
) {
=======
const API_CHECK_ZONE = "https://dbsxbxyn12.execute-api.ap-south-1.amazonaws.com/findZone";
const INFURA_WS_URL = `wss://sepolia.infura.io/ws/v3/d78f0b4330ec4a16aafc769d03977a98`;

function haversine(p1: { lat: number; lon: number }, p2: { lat: number; lon: number }) {
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
  const R = 6371e3;
  const φ1 = (p1.lat * Math.PI) / 180;
  const φ2 = (p2.lat * Math.PI) / 180;
  const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
  const Δλ = ((p2.lon - p1.lon) * Math.PI) / 180;
  const a =
<<<<<<< HEAD
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
=======
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const fmt = (n?: number, d: number = 4) =>
  typeof n === "number" ? n.toFixed(d) : "--";

function useLocation() {
<<<<<<< HEAD
  const [permission, setPermission] = useState<
    Location.PermissionStatus | "unknown"
  >("unknown");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
=======
  const [permission, setPermission] = useState<Location.PermissionStatus | "unknown">("unknown");
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
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
  const lastFetchAt = useRef<number>(0);
  const lastSent = useRef<{ lat: number; lon: number } | null>(null);

<<<<<<< HEAD
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

        lastFetchAt.current = now;
        lastSent.current = { lat, lon };
      } catch (e) {
        console.warn("Zone fetch failed:", e);
      }
    },
    []
  );
=======
  const fetchZone = useCallback(async (lat: number, lon: number, force = false) => {
    const now = Date.now();
    const movedEnough =
      !lastSent.current ||
      haversine({ lat, lon }, lastSent.current) >= 30; // 30m threshold
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

      lastFetchAt.current = now;
      lastSent.current = { lat, lon };
    } catch (e) {
      console.warn("Zone fetch failed:", e);
    }
  }, []);
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069

  useEffect(() => {
    if (!location?.coords) return;
    fetchZone(location.coords.latitude, location.coords.longitude);
  }, [location, fetchZone]);

  return { zone, refetch: fetchZone };
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

<<<<<<< HEAD
function useZoneAlerts(
  enabled: boolean,
  contractAddress?: string
): [boolean, Alert[]] {
=======
function useZoneAlerts(enabled: boolean, contractAddress?: string): [boolean, Alert[]] {
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
  const [listening, setListening] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!enabled || !contractAddress) {
      setListening(false);
      setAlerts([]);
      return;
    }

    const provider = new ethers.WebSocketProvider(INFURA_WS_URL);
<<<<<<< HEAD
    const contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      provider
    );
=======
    const contract = new ethers.Contract(contractAddress, contractJson.abi, provider);
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069

    const handler = async (
      sender: string,
      zoneNumber: number,
      message: string,
      numberPlate: string,
      make: string,
      model: string,
      wtc: string,
      event: any
    ) => {
<<<<<<< HEAD
=======

>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
      const newAlert: Alert = {
        zoneNumber,
        message,
        numberPlate,
        make,
        model,
        wtc,
      };

      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);

      await Notifications.scheduleNotificationAsync({
        content: { title: `Zone ${newAlert.zoneNumber} Alert`, body: message },
        trigger: null,
      });
    };

    contract.on("AlertPosted", handler);
    setListening(true);

    return () => {
      try {
        contract.off("AlertPosted", handler);
      } catch (e) {
        console.error("Error detaching listener:", e);
      }
      try {
        provider.destroy();
      } catch (e) {
        console.error("Error destroying provider:", e);
      }
      setListening(false);
    };
  }, [enabled, contractAddress]);

  return [listening, alerts];
}

function HomeScreen() {
  const { user } = useAuth();
  const { permission, location } = useLocation();
  const { zone, refetch } = useZone(location);
  const status = useGeofenceStatus(permission, location, zone);
<<<<<<< HEAD
  const [listening, alerts] = useZoneAlerts(
    status === "Inside",
    zone?.contractAddress
  );
=======
  const [listening, alerts] = useZoneAlerts(status === "Inside", zone?.contractAddress);
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069

  // useEffect(() => {
  //   if (!location?.coords) return;
  //   refetch(location.coords.latitude, location.coords.longitude, true);
  // }, [status]);

<<<<<<< HEAD
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Notification permission not granted!");
      }
    })();
  }, []);

=======
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView className="flex-1 items-center justify-start gap-6 p-8 bg-white">
<<<<<<< HEAD
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
=======

      {/* TODO: Header */}
      <View className='w-full flex justify-between flex-row items-center'>
        <View className='flex flex-row justify-end items-end gap-4'>
          <Image source={require('@/assets/images/main-logo.png')} style={styles.logo} />
          <View className='flex justify-start items-start gap-1'>
            <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-3xl font-medium'>AlertNet</Text>
            <View className='flex flex-row justify-start items-center gap-2'>
              <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-sm'>{`Connecting drivers, securing roads.`}</Text>
            </View>
          </View>
        </View>
        <Link href={'/profile'}>
          <View className='flex justify-center items-end flex-1 self-center'>
            <Image
              source={{ uri: user?.photo ?? "https://placehold.co/100x100/E2E8F0/4A5568?text=No+Image" }}
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
              style={styles.profilePhoto}
            />
          </View>
        </Link>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
<<<<<<< HEAD
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        {/* TODO: Your Information */}
        <View className="flex flex-col w-full gap-0 bg-white rounded-xl relative">
          <View className="self-end bg-[#F3F4F6] px-4 pt-3 pb-1 rounded-t-xl relative top-1 flex flex-row justify-start items-center gap-2">
            <View
              className={`w-2 h-2 rounded-3xl ${listening ? "bg-green-400" : "bg-red-500"}`}
            ></View>
            <Text
              style={{ fontFamily: "Poppins_400Regular" }}
              className="text-base"
            >
              {listening ? "Active" : "Inactive"}
            </Text>
          </View>
          <View className="flex flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-l-xl rounded-br-xl p-5 gap-2">
            <Text
              style={{ fontFamily: "Poppins_500Medium" }}
              className="text-2xl"
            >
              Your Information
            </Text>
            <View className="flex flex-row gap-4 justify-center items-start">
              {zone ? (
                <View className="w-36 flex justify-center items-center aspect-square">
                  <ZoneMapComponent
                    location={location}
                    zone={zone}
                    enableInteraction={false}
                  />
=======
        contentContainerStyle={{ paddingBottom: tabBarHeight, alignItems: 'center', justifyContent: 'flex-start', gap: 20 }}
      >

        {/* TODO: Your Information */}
        <View className='flex flex-col w-full gap-0 bg-white rounded-xl relative'>
          <View className='self-end bg-[#F3F4F6] px-4 pt-3 pb-1 rounded-t-xl relative top-1 flex flex-row justify-start items-center gap-2'>
            <View className={`w-2 h-2 rounded-3xl ${listening ? "bg-green-400" : "bg-red-500"}`}></View>
            <Text style={{ fontFamily: "Poppins_400Regular" }} className='text-base'>{listening ? "Active" : "Inactive"}</Text>
          </View>
          <View className='flex flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-l-xl rounded-br-xl p-5 gap-2'>
            <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-2xl'>Your Information</Text>
            <View className='flex flex-row gap-4 justify-center items-start'>
              {zone ? (
                <View
                  className='w-36 flex justify-center items-center aspect-square'>
                  <ZoneMapComponent location={location} zone={zone} enableInteraction={false} />
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
                  {/* <Image
                    source={require('@/assets/images/noun-maps.svg')}
                    style={styles.maps}
                  /> */}
                </View>
              ) : (
<<<<<<< HEAD
                <View
                  style={styles.mapPlaceholder}
                  className="w-36 flex justify-center items-center aspect-square"
                >
                  <ActivityIndicator size="small" color="#808080" />
                </View>
              )}
              <View className="flex-1 justify-between">
                <View className="flex flex-col gap-1 flex-1">
                  <View className="flex flex-row gap-3">
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg"
                    >
                      Lat
                    </Text>
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg text-gray-500"
                    >
                      {fmt(location?.coords?.latitude)}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3">
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg"
                    >
                      Long
                    </Text>
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg text-gray-500"
                    >
                      {fmt(location?.coords?.longitude)}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3">
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg"
                    >
                      Radius
                    </Text>
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg text-gray-500"
                    >
                      {zone?.radius ? `${zone.radius} m` : "—"}
                    </Text>
                  </View>
                  <View className="flex flex-row gap-3">
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg"
                    >
                      Presence
                    </Text>
                    <Text
                      style={{ fontFamily: "Poppins_500Medium" }}
                      className="text-lg text-gray-500"
                    >
                      {status}
                    </Text>
                  </View>
                </View>
                <Link
                  href={{
                    pathname: "/zonemap",
                    params: {
                      zone: JSON.stringify(zone),
                      location: JSON.stringify(location),
                    },
                  }}
                  className="flex gap-3 self-end"
                  asChild
                >
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image
                      source={require("@/assets/images/noun-expand.svg")}
=======
                <View style={styles.mapPlaceholder} className='w-36 flex justify-center items-center aspect-square'>
                  <ActivityIndicator size="small" color="#808080" />
                </View>
              )}
              <View className='flex-1 justify-between'>
                <View className='flex flex-col gap-1 flex-1'>
                  <View className='flex flex-row gap-3'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg'>Lat</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{fmt(location?.coords?.latitude)}</Text>
                  </View>
                  <View className='flex flex-row gap-3'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg'>Long</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{fmt(location?.coords?.longitude)}</Text>
                  </View>
                  <View className='flex flex-row gap-3'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg'>Radius</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{zone?.radius ? `${zone.radius} m` : "—"}</Text>
                  </View>
                  <View className='flex flex-row gap-3'>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg'>Presence</Text>
                    <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{status}</Text>
                  </View>
                </View>
                <Link href={{
                  pathname: '/zonemap',
                  params: {
                    zone: JSON.stringify(zone),
                    location: JSON.stringify(location),
                  },
                }} className='flex gap-3 self-end' asChild>
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image
                      source={require('@/assets/images/noun-expand.svg')}
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
                      style={styles.expand}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>

<<<<<<< HEAD
        {/* TODO: Zone Information */}
        <View className="flex flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-2">
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-2xl"
          >
            Zone Information
          </Text>
          <View className="flex flex-col justify-start items-start gap-1">
            <View className="flex flex-row gap-3">
              <Text
                className="text-lg"
                style={{ fontFamily: "Poppins_500Medium" }}
              >
                Zone name
              </Text>
              <Text
                style={{ fontFamily: "Poppins_500Medium" }}
                className="text-lg text-gray-500"
              >
                {zone?.zoneName ?? "—"}
              </Text>
            </View>
            <View className="flex w-full flex-row gap-3">
              <Text
                className="text-lg"
                style={{ fontFamily: "Poppins_500Medium" }}
              >
                Address
              </Text>
=======

        {/* TODO: Zone Information */}
        <View className='flex flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-2'>
          <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-2xl'>Zone Information</Text>
          <View className='flex flex-col justify-start items-start gap-1'>
            <View className='flex flex-row gap-3'>
              <Text className='text-lg' style={{ fontFamily: "Poppins_500Medium" }}>Zone name</Text>
              <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{zone?.zoneName ?? "—"}</Text>
            </View>
            <View className='flex w-full flex-row gap-3'>
              <Text className='text-lg' style={{ fontFamily: "Poppins_500Medium" }}>Address</Text>
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    flexWrap: "wrap",
                  }}
                  className="text-lg text-gray-500"
                  numberOfLines={0}
                  ellipsizeMode="tail"
                >
                  {zone?.contractAddress ?? "—"}
                </Text>
              </View>
            </View>
<<<<<<< HEAD
            <View className="flex flex-row justify-between w-full">
              <View className="flex flex-row gap-3">
                <Text
                  style={{ fontFamily: "Poppins_500Medium" }}
                  className="text-lg"
                >
                  Lat
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_500Medium" }}
                  className="text-lg text-gray-500"
                >
                  {fmt(zone?.latitude)}
                </Text>
              </View>
              <View className="flex flex-row gap-3">
                <Text
                  style={{ fontFamily: "Poppins_500Medium" }}
                  className="text-lg"
                >
                  Long
                </Text>
                <Text
                  style={{ fontFamily: "Poppins_500Medium" }}
                  className="text-lg text-gray-500"
                >
                  {fmt(zone?.longitude)}
                </Text>
              </View>
              <View className="flex flex-row gap-3">
                {zone?.contractAddress && (
                  <Link
                    href={`https://sepolia.etherscan.io/address/${zone.contractAddress}`}
                    asChild
                  >
                    <TouchableOpacity activeOpacity={0.6}>
                      <Image
                        source={require("@/assets/images/noun-link.svg")}
=======
            <View className='flex flex-row justify-between w-full'>
              <View className='flex flex-row gap-3'>
                <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg'>Lat</Text>
                <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{fmt(zone?.latitude)}</Text>
              </View>
              <View className='flex flex-row gap-3'>
                <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg'>Long</Text>
                <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-lg text-gray-500'>{fmt(zone?.longitude)}</Text>
              </View>
              <View className='flex flex-row gap-3'>
                {
                  zone?.contractAddress &&
                  <Link href={`https://sepolia.etherscan.io/address/${zone.contractAddress}`} asChild>
                    <TouchableOpacity activeOpacity={0.6}>
                      <Image
                        source={require('@/assets/images/noun-link.svg')}
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
                        style={styles.expand}
                      />
                    </TouchableOpacity>
                  </Link>
<<<<<<< HEAD
                )}
=======
                }
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
              </View>
            </View>
          </View>
        </View>

        {/* TODO: Posted Alerts */}
<<<<<<< HEAD
        <View className="flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-3 flex-1">
          <Text
            style={{ fontFamily: "Poppins_500Medium" }}
            className="text-2xl"
          >
            Alerts
          </Text>
          <AlertLoader listening={listening} />
          {alerts.map((alert, idx) => (
            <AlertCard alert={alert} key={idx} />
          ))}
=======
        <View className='flex-col justify-start items-start w-full bg-[#F3F4F6] rounded-xl p-5 gap-3 flex-1'>
          <Text style={{ fontFamily: "Poppins_500Medium" }} className='text-2xl'>Alerts</Text>
          <AlertLoader listening={listening} />
          {
            alerts.map((alert, idx)=><AlertCard alert={alert} key={idx}/>)
          }
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
        </View>
      </ScrollView>

      <LinearGradient
        style={styles.fadeOverlay}
<<<<<<< HEAD
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        pointerEvents={"none"}
=======
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        pointerEvents={'none'}
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
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
<<<<<<< HEAD
    position: "absolute",
=======
    position: 'absolute',
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  mapPlaceholder: {
<<<<<<< HEAD
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
=======
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Match your card background color
    borderRadius: 12,
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
    gap: 8,
  },
});

<<<<<<< HEAD
export default HomeScreen;
=======
export default HomeScreen;
>>>>>>> 5eb9be191ca928e8617a991d9ba73eb41f9de069
