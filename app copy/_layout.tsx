import { initializeNotifications } from '@/components/NotificationButton';
import { Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();
initializeNotifications();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_400Regular_Italic,
    Poppins_500Medium
  });

  useEffect(() => {
    async function prepare() {
      try {
        GoogleSignin.configure({
          iosClientId: "116250151998-bct3cu88f6lu3fqjngsvk9sb9fim7kro.apps.googleusercontent.com",
          webClientId: "116250151998-l4ks9m1bbkgebbqmooko2golk0mi2s0q.apps.googleusercontent.com",
          profileImageSize: 150
        })
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
      console.log('Splash Screen Hidden');
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}