import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { Provider } from "react-redux";
import store from "@/store/store";

import { useColorScheme } from "@/components/useColorScheme";

import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { auth } from "@/firebaseConfig";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

type RootStackParamList = {
  LoginScreen: undefined;
};

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
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
  const colorScheme = useColorScheme();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("LoginScreen");
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <PaperProvider>
      <ThemeProvider value={DefaultTheme}>
        <Provider store={store}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen
              name="RegisterScreen"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="ResetPasswordScreen" />
            <Stack.Screen
              name="path"
              options={{
                title: "Path",
              }}
              initialParams={{ trackId: "" }}
            />
          </Stack>
        </Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
