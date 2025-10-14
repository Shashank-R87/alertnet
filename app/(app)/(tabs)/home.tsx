import AlertCard from "@/components/AlertCard";
import AlertLoader from "@/components/AlertLoader";
import ZoneMapComponent from "@/components/ZoneMapComponent";
import { useAuth } from "@/context/AuthContext";
import { useZoneContext } from "@/context/ZoneContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ethers } from "ethers";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import contractJson from "../../../lib/ZoneAlert.json";

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

const INFURA_WS_URL = `wss://sepolia.infura.io/ws/v3/d78f0b4330ec4a16aafc769d03977a98`;

const fmt = (n?: number, d: number = 4) =>
  typeof n === "number" ? n.toFixed(d) : "--";

function useZoneAlerts(
  enabled: boolean,
  contractAddress?: string
): [boolean, Alert[]] {
  const [listening, setListening] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!enabled || !contractAddress) {
      setListening(false);
      setAlerts([]);
      return;
    }

    const provider = new ethers.WebSocketProvider(INFURA_WS_URL);
    const contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      provider
    );

    const handler = async (
      sender: string,
      zoneNumber: number,
      message: string,
      numberPlate: string,
      make: string,
      model: string,
      wtc: string,
      latitude: number,
      longitude: number,
      timestampMillis: number
    ) => {
      const newAlert: Alert = {
        zoneNumber,
        message,
        numberPlate,
        make,
        model,
        wtc,
        latitude,
        longitude,
        timestampMillis,
      };
      newAlert.latitude = Number(newAlert.latitude) / 1000000;
      newAlert.longitude = Number(newAlert.longitude) / 1000000;
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Zone ${newAlert.zoneNumber} Alert 🚨`,
          body: newAlert.message,
          sound: "default",
        },
        trigger: null, 
      });
    };

    contract.on("AlertPosted", handler);
    setListening(true);

    return () => {
      contract.off("AlertPosted", handler);
      provider.destroy();
      setListening(false);
    };
  }, [enabled, contractAddress]);

  return [listening, alerts];
}

function HomeScreen() {
  const { user } = useAuth();
  const { location, zone, status } = useZoneContext();
  const [listening, alerts] = useZoneAlerts(
    status === "Inside",
    zone?.contractAddress
  );

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView className="flex-1 items-center justify-start gap-6 p-8 bg-white">
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

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
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
                    alerts={alerts}
                  />
                </View>
              ) : (
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
                      alerts: JSON.stringify(alerts, (key, value) =>
                        typeof value === "bigint" ? value.toString() : value
                      ),
                    },
                  }}
                  className="flex gap-3 self-end"
                  asChild
                >
                  <TouchableOpacity activeOpacity={0.6}>
                    <Image
                      source={require("@/assets/images/noun-expand.svg")}
                      style={styles.expand}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </View>

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
                        style={styles.expand}
                      />
                    </TouchableOpacity>
                  </Link>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* TODO: Posted Alerts */}
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
        </View>
      </ScrollView>

      <LinearGradient
        style={styles.fadeOverlay}
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        pointerEvents={"none"}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

// --- Styles (Keep these as they are) ---
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
    backgroundColor: "#E5E7EB", // A slightly different gray
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

export default HomeScreen;
