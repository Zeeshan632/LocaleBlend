import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import images from '../assets/images'
import colors from '../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo'
import Button from './Button';
import FastImage from 'react-native-fast-image';

const CommentComp = ({userAvatar, username, time, commentText}) => {
  return (
    <View style={{backgroundColor: 'white', borderRadius: 25,padding: 10}}>

      <View style={{flexDirection:'row', width: '98%', alignSelf: 'center', justifyContent: 'space-between', marginVertical: 10}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            {userAvatar ? <FastImage source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${userAvatar}`}} style={{width: wp('15%'), height: hp('7%'), borderRadius: 15}} /> :  <Image source={images.profilePlaceholder} style={styles.image} /> }
            <View style={{marginLeft: 8}}>
                <Text style={{color: 'black',fontSize: wp('4.5%')}}>{username}</Text>
                <Text style={{color: 'black',fontSize: wp('3.5%'),color: 'grey'}}>{time}</Text>
            </View>
        </View>
      </View>

      <View style={{width: '95%', alignSelf: 'center'}}>
        <Text style={{color: '#021819', marginVertical: 8, fontSize: wp('3.5%'),lineHeight: 23}}>{commentText}</Text>
      </View>
      
    </View>
  )
}

export default CommentComp

const styles = StyleSheet.create({})