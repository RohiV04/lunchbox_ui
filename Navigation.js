import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home.js';
import Notification from './Notification.js';
import LoginScreen from './Login.js';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  // Get the phoneNumber state from the Redux store
  const phoneNumber = useSelector((state) => state.phoneNumber);

  // Check if the phoneNumber is set (not null)
  const isLoggedIn = phoneNumber !== null;
console.log(isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: '#9AC5F4' }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// import React from 'react';
// import { useSelector } from 'react-redux'; // Import useSelector from react-redux
// import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import Home from './Home.js';
// import Notification from './Notification.js';
// import LoginScreen from './Login.js';
// import { setPhoneNumber } from './store.js';
// const Stack = createStackNavigator();
// const Tab = createMaterialBottomTabNavigator();

// export default function Navigation() {
//   // Get the phoneNumber state from the Redux store
//   const phoneNumber = useSelector((state) => state.phoneNumber);

//   // Check if the phoneNumber is set (not null)
//   const isLoggedIn = phoneNumber !== null;

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {isLoggedIn ? (
//           <Stack.Screen
//             name="Main"
//             component={BottomTab}
//             options={{ headerShown: false }}
//           />
//         ) : (
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const BottomTab = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       activeColor="#fff"
//       barStyle={{ backgroundColor: 'blue' }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notification"
//         component={Notification}
//         options={{
//           tabBarLabel: 'Updates',
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="bell" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };
