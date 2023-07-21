import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Notification from './Notification';
import { SafeAreaView } from 'react-native-safe-area-context';
const Home = () => {
  console.log("Home Is Rendered");
  return (
    <View>
<Notification/>
<SafeAreaView>
  <Text style={{fontSize:20}}>Welcome to the App!</Text>
</SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})