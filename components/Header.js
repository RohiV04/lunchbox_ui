import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const [parentData, setParentData] = useState(null);
  const phoneNumber = useSelector((state) => state.phoneNumber);

  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/auth/login/${phoneNumber}`
        );
        const parentdata = response.data;
        console.log("Fetched Parent Data:", parentdata);

        setParentData(parentdata.user);
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    fetchParentData();
  }, [phoneNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {parentData ? `Welcome ${parentData.p_name}` : "Loading..."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    // fontWeight: "bold",
  },
});

export default Header;
