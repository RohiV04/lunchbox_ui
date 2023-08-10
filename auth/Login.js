import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setPhoneNumber } from "../redux/store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Update the API endpoint and pass the phoneNumber as a parameter
      const response = await axios.get(
        `http://localhost:3000/auth/login/${phoneNumberState}`
      );
      const isLoginSuccessful = response.data;

      if (isLoginSuccessful) {
        dispatch(setPhoneNumber(phoneNumberState));
        navigation.navigate("Main"); // Uncomment this line to navigate to the 'Main' screen
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image source={require("../assets/lunchbox.png")} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumberState(text)}
        value={phoneNumberState}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Add a background color for the container
    padding: 20, // Add some padding to create space between elements and screen edges
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // Make the title text bold
    marginBottom: 40,
  },
  input: {
    width: "100%", // Use 100% width to fill the container
    height: 40,
    borderColor: "#ccc", // Change border color to a light gray
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15, // Increase the horizontal padding for better spacing
    borderRadius: 5, // Add border radius to the input fields
    backgroundColor: "#fff", // Add a white background to the input fields
  },
  button: {
    width: "100%", // Use 100% width to fill the container
    backgroundColor: "blue",
    padding: 15, // Increase padding for better button size
    borderRadius: 5,
    alignItems: "center", // Align text inside the button to the center
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
