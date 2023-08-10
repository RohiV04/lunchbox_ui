import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import Delivery from "../components/DeliveryStatus";

const Home = () => {
  return (
    <View>
      <SafeAreaView>
        <Header />
        <Delivery />
      </SafeAreaView>
    </View>
  );
};

export default Home;
