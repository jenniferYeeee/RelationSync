import { View, StyleSheet, Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Touchable, TouchableOpacity } from 'react-native';
export default function Auth() {
  return(
    <View style = {styles.container}>
      <Text>Todo web auth</Text>
    </View>
  )
}
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})