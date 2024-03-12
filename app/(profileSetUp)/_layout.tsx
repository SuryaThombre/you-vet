import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';

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
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
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
  const navigation = useNavigation()


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
        // headerTitle: () => (
        //   <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
        //     <AntDesign name="arrowleft" size={24} color="black" />
        //     <Text>Profile set up</Text>
        //   </View>
        // )
      }}>
        <Stack.Screen name="index" options={{
          headerTitle: () => (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {/* <Pressable onPress={() => navigation.goBack()} >
              <AntDesign name="arrowleft" size={20} color="black" />
            </Pressable> */}
                 <Text style={{flex:1, fontWeight: '600', fontSize: 24, textAlign: 'center', marginRight:35 }}>Profile set up</Text>
            </View>
          ),
          headerBackVisible: true,
        }} />
        <Stack.Screen name="profileSetUp" options={{ 
          headerTitle: () => (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Pressable onPress={() => navigation.goBack()} >
              <AntDesign name="arrowleft" size={20} color="black" />
            </Pressable>
            <Text style={{flex:1, fontWeight: '600', fontSize: 24, textAlign: 'center', paddingRight:70 }}>Profile set up</Text>
            </View>
          ),
          headerBackVisible: true,
          }} />
        <Stack.Screen name="locationScreen" options={{ 
          headerTitle: () => (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Pressable onPress={() => navigation.goBack()} >
            <AntDesign name="arrowleft" size={20} color="black" />
          </Pressable>
          <Text style={{flex:1, fontWeight: '600', fontSize: 24, textAlign: 'center', paddingRight:70 }}>Profile set up</Text>
          </View>
          ),
          headerBackVisible: true,

        }} />
      </Stack>
    </ThemeProvider>
  );
}
