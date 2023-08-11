import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Card, Badge } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Header from "../components/Header";

const Delivery = () => {
  const [tripData, setTripData] = useState(null);
  const [error, setError] = useState(null);

  const phoneNumber = useSelector((state) => state.phoneNumber);

  const fetchTripData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/data/trip/${phoneNumber}`
      );
      const data = response.data[0];
      setTripData(data);
      setError(null);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Today is a holiday.");
      } else {
        setError("Error fetching trip data.");
      }
      setTripData(null);
    }
  };

  useEffect(() => {
    fetchTripData();
  }, []);

  const renderDeliveryStatus = (trip) => {
    if (!trip.pickup_time) {
      return (
        <Badge
          value="Delivery Person Has Arrived"
          status="warning"
          badgeStyle={styles.warningBadge}
          textStyle={styles.badgeText}
        />
      );
    } else if (!trip.drop_time) {
      return (
        <Badge
          value="Box is Picked Up and In Transit"
          status="primary"
          badgeStyle={styles.primaryBadge}
          textStyle={styles.badgeText}
        />
      );
    } else {
      return (
        <Badge
          value="Box is Delivered"
          status="success"
          badgeStyle={styles.successBadge}
          textStyle={styles.badgeText}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : tripData ? (
          <View style={styles.cardContainer}>
            <Text style={styles.title}>Delivery Information</Text>
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>
                <FontAwesome name="calendar" size={18} /> Date
              </Card.Title>
              <Text style={styles.cardText}>{tripData.date}</Text>
            </Card>
            <Card containerStyle={styles.card}>
              <Card.Title style={styles.cardTitle}>
                <FontAwesome name="info-circle" size={18} /> Delivery Status
              </Card.Title>
              {renderDeliveryStatus(tripData)}
            </Card>
            {tripData.pickup_time && (
              <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>
                  <FontAwesome name="clock-o" size={18} /> Pickup Time
                </Card.Title>
                <Text style={styles.cardText}>{tripData.pickup_time}</Text>
              </Card>
            )}
            {tripData.drop_time && (
              <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>
                  <FontAwesome name="clock-o" size={18} /> Drop Time
                </Card.Title>
                <Text style={styles.cardText}>{tripData.drop_time}</Text>
              </Card>
            )}
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: "flex-1 bg-gray-100",
  content: "flex-1",
  cardContainer: "p-4",
  card: "rounded-lg shadow-md mb-4 bg-white",
  cardTitle: "text-lg font-bold p-4",
  cardText: "text-base p-4",
  title: "text-2xl font-bold mt-4 mb-4 ml-6",
  warningBadge: "bg-yellow-400",
  primaryBadge: "bg-blue-500",
  successBadge: "bg-green-600",
  badgeText: "text-sm",
  errorText: "text-red-500 text-lg text-center mt-8",
};

export default Delivery;
