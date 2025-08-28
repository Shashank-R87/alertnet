import LoginButton from "@/components/LoginButton";
import LogoName from "@/components/LogoName";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import NotificationButton from '../components/NotificationButton';

export default function Index() {
  return (
    <View
      className="flex flex-col justify-center items-center flex-1 gap-24 bg-gray-100"
    >
      <LogoName />
      <LoginButton />
      <NotificationButton />
      <StatusBar style="dark" />
    </View>
  );
}


