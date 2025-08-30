import LoginButton from "@/components/LoginButton";
import LogoName from "@/components/LogoName";
import { useAuth } from '@/context/AuthContext';
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

export default function LoginScreen() {
  const { isSigningIn } = useAuth();

  return (
    <View
      className="flex-1 flex-col items-center justify-center gap-24 bg-white"
    >
      <LogoName />
      {isSigningIn ? (
        <View className="h-14 justify-center items-center">
            <ActivityIndicator size="small" color="#808080" />
        </View>
      ) : (
        <LoginButton />
      )}
      
      <StatusBar style="dark" />
    </View>
  );
}
