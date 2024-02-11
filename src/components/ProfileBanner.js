import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import images from '../assets/images'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../theme/colors';
import Button from './Button';


const ProfileBanner = ({username, email, image}) => {
  return (
    <View style={{backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}}>

      <View style={{width: '100%', height: 320, alignSelf: 'center', justifyContent: 'space-between', marginVertical: 10}}>
        <View style={{width: '100%', height: 160, overflow: 'hidden', borderRadius: 25}}>
            <FastImage source={images.profileCover} style={{height: '100%', resizeMode: "cover" }} />
        </View>
        <View style={{flexDirection:'column',alignItems:'center', width: '100%', position: 'absolute', top: 90}}>
            {image ? <FastImage source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${image}`}} style={styles.image} /> : <Image source={images.profilePlaceholder} style={styles.image} />} 
            <View style={{marginLeft: 12, alignItems: 'center', width: '100%'}}>
                <Text style={{color: '#35383C', textAlign: 'center', fontSize: wp('6.2%'), fontWeight: 'bold'}}>{username.length > 18 ? `${username.slice(0, 18)}...` : username}</Text>
                <Text style={styles.email}>{email.length > 45 ? `${email.slice(0, 45)}...` : email}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', overflow:'hidden', width: '100%',  flexWrap: 'wrap' }}>
                    <Text style={styles.hashTag}>#enthusiastic</Text>
                    <Text style={styles.hashTag}>#thinker</Text>
                    <Text style={styles.hashTag}>#creativestrategist</Text>
                </View>
            </View>
        </View>
        
      </View>

     
      
     
    </View>
  )
}

export default ProfileBanner

const styles = StyleSheet.create({
    hashTag: {
        color: 'grey', 
        textAlign: 'center', 
        fontSize: wp('3.6%'), 
        margin: 3
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 250,
      resizeMode: 'cover',
      borderColor: 'black',
    },
    email: {color: 'black', textAlign: 'center', fontSize: wp('4%'), width: '75%',color: "#35383C", marginVertical: 5}
})