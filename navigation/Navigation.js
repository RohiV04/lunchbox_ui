import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home.js';
import Notification from '../utils/Notification.js';
import LoginScreen from '../auth/Login.js';
import Profile from '../screens/Profile.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
const Stack = createStackNavigator();
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  // Get the phoneNumber state from the Redux store
  const phoneNumber = useSelector((state) => state.phoneNumber);

  // Check if the phoneNumber is set (not null)
  const isLoggedIn = phoneNumber !== null;

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: false }}
          />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: { backgroundColor: 'transparent' },
        showLabel: false,
      }}
      tabBar={(props) => (
        <>
          <CustomTabBarBackground />
          <BottomTabNavigator {...props} />
        </>
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const CustomTabBarBackground = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabBarBackground, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        colors={['rgba(241, 202, 255, 0.8)', 'rgba(241, 202, 255, 0.3)']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.gradient}
      />
    </View>
  );
};
