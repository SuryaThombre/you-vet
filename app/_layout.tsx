import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import { Text, View } from "@/components/Themed";
import { Pressable, StatusBar } from "react-native";
import MyHeader from "@/components/profileHeader";
import {
  Header,
  HeaderBackButton,
  getHeaderTitle,
} from "@react-navigation/elements";
import UserProfileProvider from "@/providers/profileSetUpProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(profileSetUp)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#151515" : "#fff"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        translucent={false}
      />
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <UserProfileProvider>
            <Stack
              // initialRouteName="(profileSetUp)"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="(profileSetUp)"
                options={{ headerShown: false }}
              />
            </Stack>
          </UserProfileProvider>
        </ThemeProvider>
      </SafeAreaView>
    </>
  );
}
