import { View, Text } from 'react-native'
import React from 'react'
import {Link} from 'expo-router';
const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href = {"/map/1"}>Map</Link>
    </View>
  )
}

export default Page