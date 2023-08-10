import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Notification from '../utils/Notification';
import { SafeAreaView } from "react-native-safe-area-context";
export default function Profile() {
  return (
    <View>
      <SafeAreaView>
        <Text style={{ fontSize: 20 }}>Welcome to the Profile Screen!</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({})