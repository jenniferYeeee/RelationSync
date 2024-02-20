import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
//import { useColorScheme } from '@/components/useColorScheme';
//const API_KEY;
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'imb': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
    'imb-l': require('../assets/fonts/IBMPlexSans-Light.ttf'),
    'imb-sb': require('../assets/fonts/IBMPlexSans-SemiBold.ttf'),
    'imb-b': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
        name="(modals)/login" 
        options={{ 
          title: 'Log in or sign up',
          headerTitleStyle:{
            fontFamily: 'imb',
          },
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress = {()=>router.back()} >
              <Ionicons name="close-outline" size={24} color="black"/>
            </TouchableOpacity>
          ),
          }} 
        />
        <Stack.Screen name="map/[id]" options={{headerTitle:''}}/>
      </Stack>
  );
}
