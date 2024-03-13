
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';
import { Alert,Pressable, StyleSheet } from 'react-native';

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

const HeaderProgressBar = ({ progress, canGoBack, handleGoBack }) => (
  <View style={styles.headerContainer}>
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
    <View style={styles.headerBottomContainer}>
      {canGoBack && (
        <Pressable onPress={handleGoBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
      )}
      <Text style={styles.headerText}>Profile set up</Text>
    </View>
  </View>
);

const handleGoBackPress = () => {
  Alert.alert(
    'Cancel Registration Process',
    'Are you sure you want to cancel the registration process? All progress will be lost.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, Cancel',
        onPress: () => {
          console.log("Registration process cancelled");
          
        },
      },
    ],
    { cancelable: false }
  );
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          // headerTitle: () => (
          //   <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
          //     <AntDesign name="arrowleft" size={24} color="black" />
          //     <Text>Profile set up</Text>
          //   </View>
          // )
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <HeaderProgressBar progress={0.5}  canGoBack={true}
            handleGoBack={handleGoBackPress} />, // 50% progress
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="profileSetUp"
          options={{
            headerTitle: () => (
              <HeaderProgressBar
                progress={1} // 100% progress
                canGoBack={true}
                // handleGoBack={() => navigation.goBack()}
                handleGoBack={handleGoBackPress}
              />
            ),
            headerBackVisible: false,
          }}
        />
        
            <Stack.Screen name="locationScreen" options={{ 
          headerTitle: () => (
            <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-start', gap: 10}}>
            <Pressable onPress={() => navigation.goBack()} >
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          {/* <Text style={{flex:1, fontWeight: '600', fontSize: 24, textAlign: 'center', paddingRight:70 }}>Profile set up</Text> */}
          </View>
          ),
          headerBackVisible: false,

        }} />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingRight: 30,
  },
  progressBar: {
    flex: 1,
    height: 4,
    width: '98%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 8,
    position: 'absolute',
    top: -1,
    left: 2
  },
  progress: {
    height: '100%',
    backgroundColor: '#f15d22',
    borderRadius: 10,
  },
  headerBottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 8,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
});