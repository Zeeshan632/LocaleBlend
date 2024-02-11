import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import images from '../assets/images'
import Feather from 'react-native-vector-icons/Feather'
import colors from '../theme/colors';
import Button from './Button';
import FastImage from 'react-native-fast-image';


const ProfileCard = ({username, email, onPress, profileImage}) => {

  return (
    <View style={{backgroundColor: 'white', borderRadius: 15,padding: 10}}>

      <View style={{flexDirection:'row', width: '98%', alignSelf: 'center', justifyContent: 'space-between', marginVertical: 10}}>
        <View style={{flexDirection:'row',alignItems:'center', width: '100%'}}>
            {profileImage ? <FastImage source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${profileImage}`}} style={styles.image} /> : <Image source={images.profilePlaceholder} style={styles.image} />} 
            
            <View style={{marginLeft: 12, width: '55%'}}>
                <Text style={{color: '#35383C',fontSize: wp('6.2%'), fontWeight: 'bold'}}>{username?.length > 12 ? `${username.slice(0, 12)}...` : username}</Text>
                <Text style={{color: 'black',fontSize: wp('3.6%'), width: '75%', color: colors.themeColorOrange, marginVertical: 5}}>PRO PLAN</Text>
                <Text style={{color: 'black',fontSize: wp('3.6%'), width: '90%',color: 'grey'}}>{email?.length > 19 ? `${email.slice(0, 19)}...` : email}</Text>
                <Text onPress={onPress} style={{color: 'black',fontSize: wp('3.6%'), width: '75%',color: colors.themeColorOrange, marginVertical: 5}}><Feather name="edit-3" size={16} color={colors.themeColorOrange} />  Edit Profile</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 250,
    resizeMode: 'cover',
    borderColor: 'black',
  }
})