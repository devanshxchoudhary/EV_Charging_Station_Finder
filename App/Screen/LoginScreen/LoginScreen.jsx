import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { View, Image, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';
import Colors from './../../Utils/Colors';
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
   useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = async()=>{
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }
  return (
    <View style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 80
    }}>
      <Image
        source={require('./../../../assets/images/logo2.png')}
        style={styles.logoImage}
      />
      <Image
        source={require('./../../../assets/images/evchargin.jpeg')}
        style={styles.bgImage}
      />
      <View style={{padding:20}}>
            <Text style={styles.heading}>Your Ultimate EV Charging finder App</Text>
            <Text style={styles.desc}>Find EV CHarging station near you, plan a trip and much more in just one click</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{
                    color:Colors.WHITE,
                    textAlign:"center",
                    fontFamily:'outfit',
                    fontSize:17,
                }}>Login with Google</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 200,
    height: 40,
  },
  bgImage:{
    width: '100%', 
    height: 220, 
    marginTop: 20, 
    resizeMode: 'cover'
  },
  heading:{
    fontSize: 25, 
    fontFamily: 'outfit-bold', 
    textAlign: 'center', 
    marginTop: 20
  },
  desc:{
    fontSize: 17, 
    fontFamily: 'outfit', 
    marginTop: 15, 
    textAlign: 'center',
    color:Colors.GRAY
  },
  button:{
    backgroundColor: Colors.PRIMARY,
    padding: 16, 
    display: 'flex', 
    borderRadius: 40, 
    marginTop: 40
  }
});
