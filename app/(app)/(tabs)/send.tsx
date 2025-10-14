import AlertLoader from "@/components/AlertLoader";
import SendAlertComponent from "@/components/SendAlertComponent";
import { useAuth } from "@/context/AuthContext";
import { useZoneContext } from "@/context/ZoneContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
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

function Send() {
  const { user } = useAuth();
  const { location, zone, connected } = useZoneContext();

  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const onRefresh = useCallback(() => {

    setRefreshing(true);
    setComponentKey((prevKey) => prevKey + 1);
    setRefreshing(false);
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
