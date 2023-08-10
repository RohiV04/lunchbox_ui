import { StatusBar, Platform } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Notification() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const phoneNumber = useSelector((state) => state.phoneNumber);
  const [send, setSend] = useState(false);
  const triggerNotification = async () => {
    if (phoneNumber) {
      try {
        // Make an API request to get trip data based on the phone number
        const response = await axios.get(
          `http://localhost:3000/data/trip/${phoneNumber}`
        );
        const tripData = response.data;
        console.log(tripData[0]);

        if (tripData[0].pickup_time != null) {
          console.log(
            "🚀 ~ file: notification.js:48 ~ triggerNotification ~ date:",
            tripData[0].pickup_time
          );
          // Trigger the notification if delivery time is not null

          await Notifications.presentNotificationAsync({
            title: "LunchBox",
            body: `Your Box is Picked Up at ${tripData[0].pickup_time}`,
            data: { tripId: tripData.tripId }, // You can pass additional data if needed
            sound: "default",
          });
          setSend(true);
        }

        if (tripData[0].drop_time != null) {
          console.log(
            "🚀 ~ file: notification.js:59 ~ triggerNotification ~ date:",
            tripData[0].drop_time
          );
          // Trigger the notification if pickup time is not null
          await Notifications.presentNotificationAsync({
            title: "LunchBox",
            body: `Your Box is Delivered at ${tripData[0].drop_time}`,
            data: { tripId: tripData.tripId }, // You can pass additional data if needed
            sound: "default",
          });
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    }
  };
  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          console.log("Permission Granted");
          alert("Enable push notifications to use the app!");
          await AsyncStorage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("🚀 ~ file: App.js:36 ~ getPermission ~ token:", token);

        await AsyncStorage.setItem("expopushtoken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          sound: true,
        });
      }
    };

    getPermission();
    triggerNotification();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [phoneNumber]);
  // Scheduled Notification
  // const onClick = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'Lunchbox',
  //       body: 'Button Clicked',
  //       data: { data: 'data goes here' },
  //     },
  //     trigger: {
  //       hour: 9,
  //       minute: 20,
  //       repeats: true,
  //     },
  //   });
  // };
  const onClick = async () => {
    await Notifications.presentNotificationAsync({
      title: "Lunchbox",
      body: "Button Clicked",
      data: { data: "data goes here" },
      sound: "default",
    });
  };

  return <>This Is Notification</>;
}
