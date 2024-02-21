import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
// import { Auth } from '@/components/Auth.native'
enum Strategy{
  Google = 'oauth_google',
  Apple = 'oauth_apple',
}
const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const{startOAuthFlow:googleAuth} = useOAuth({strategy:'oauth_google'})
  const{startOAuthFlow:appleAuth} = useOAuth({strategy:'oauth_apple'})

  const onSelectAuth = async(strategy:Strategy) =>{
    const selectedAuth = {
    [Strategy.Google]:googleAuth,
    [Strategy.Apple]:appleAuth,
  }[strategy];
  try {
    const {createdSessionId,setActive} = await selectedAuth();
    console.log("file = login.tsx 26, onselectAuth, createdSessionId = ", createdSessionId)
    if(createdSessionId){
      setActive!({session:createdSessionId})
      router.back();//might wanna push the profile page?
    }
  }catch(e){
    console.error('OAuth error', e)
  }
}

  return(
    <View style={styles.container}>
      <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, {marginBottom: 30}]}/>
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View style={
          {
            borderBottomColor: '#000',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }
        }/>
        <Text style={styles.seperator}>or</Text>
      </View>
      <View style={{gap:20}}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24}/>  
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Apple)}>
          <Ionicons name='logo-apple' style={defaultStyles.btnIcon} size={24}/>
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=> onSelectAuth(Strategy.Google)}>
          <Ionicons name='logo-google' style={defaultStyles.btnIcon} size={24}/>  
          <Text style={styles.btnOutlineText}>Continue with Google</Text>  
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:26,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  seperator:{
    fontFamily: 'imb-l',
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'imb',
  },
})
export default Page