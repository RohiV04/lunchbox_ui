import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../components/Header";

const Delivery = () => {
  const [tripData, setTripData] = useState(null);

  const phoneNumber = useSelector((state) => state.phoneNumber);
  
  const fetchTripData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/data/trip/${phoneNumber}`
      );
      const data = response.data[0];
      setTripData(data);
    //   console.log("Fetched Trip Data:", data);
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  useEffect(() => {
    fetchTripData();
  }, []);

  const renderDeliveryStatus = (trip) => {
    if (!trip.pickup_time) {
      return "Delivery Person Has Arrived";
    } else if (!trip.drop_time) {
      return "Box is Picked Up and In Transit";
    } else {
      return "Box is Delivered";
    }
  };

  return (
    <View>
      <SafeAreaView>
      <View  >
        <Text style={styles.title}>Delivery Information</Text>
        {tripData && (
          <View style={styles.tripContainer}>
            <View style={styles.tripInfo}>
              <Text style={styles.infoTitle}>Date:</Text>
              <Text style={styles.infoValue}>{tripData.date}</Text>
            </View>
            <View style={styles.tripInfo}>
              <Text style={styles.infoTitle}>Delivery Status:</Text>
              <Text style={styles.infoValue}>
                {renderDeliveryStatus(tripData)}
              </Text>
            </View>
            {tripData.pickup_time && (
              <View style={styles.tripInfo}>
                <Text style={styles.infoTitle}>Pickup Time:</Text>
                <Text style={styles.infoValue}>{tripData.pickup_time}</Text>
              </View>
            )}
            {tripData.drop_time && (
              <View style={styles.tripInfo}>
                <Text style={styles.infoTitle}>Drop Time:</Text>
                <Text style={styles.infoValue}>{tripData.drop_time}</Text>
              </View>
            )}
          </View>
        )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    marginLeft: 24,

  },
  tripContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
  },
});

export default Delivery;
