import { initializeNotifications } from '@/components/NotificationButton';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Poppins_400Regular, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '../global.css';

SplashScreen.preventAutoHideAsync();
initializeNotifications();

GoogleSignin.configure({
  iosClientId: "116250151998-bct3cu88f6lu3fqjngsvk9sb9fim7kro.apps.googleusercontent.com",
  webClientId: "116250151998-l4ks9m1bbkgebbqmooko2golk0mi2s0q.apps.googleusercontent.com",
  profileImageSize: 150
})

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  useEffect(() => {
    if (isLoading || !fontsLoaded) {
      return;
    }

    const inAppGroup = segments[0] === '(app)';
    const inAuthGroup = segments[0] === '(auth)';
    
    if (user && !inAppGroup) {
      router.replace({ pathname: '/home' });
    } else if (!user && !inAuthGroup) {
      router.replace({ pathname: '/login' });
    }

    SplashScreen.hideAsync();

  }, [user, isLoading, fontsLoaded, segments]);

  if (isLoading || !fontsLoaded) {
    return null;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
