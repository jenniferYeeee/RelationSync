import { View, Text } from 'react-native'
import React from 'react'
import { Auth } from '@/components/Auth.native'

const Page = () => {
  return (
    <View>
      <Text>Login</Text>
      <Auth />
    </View>
  )
}

export default Page