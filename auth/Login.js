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
      const response = await axios.get(
        `http://localhost:3000/auth/login/${phoneNumberState}`
      );
      const isLoginSuccessful = response.data;

      if (isLoginSuccessful) {
        dispatch(setPhoneNumber(phoneNumberState));
        navigation.navigate("Main");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/lunchbox.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to LunchBox</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center align the text
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
