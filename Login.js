import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setPhoneNumber } from "./store";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = () => {
  console.log("Im in Login Screen");
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post("your_api_endpoint", {
        phoneNumber: phoneNumberState,
      });
      const isLoginSuccessful = response.data.success;

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
