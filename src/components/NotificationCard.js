import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import images from '../assets/images'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../theme/colors';
import Button from './Button';


const NotificationCard = ({name, content}) => {
  return (
    <View style={{backgroundColor: 'white', borderRadius: 25,padding: 10}}>

      <View style={{flexDirection:'row', width: '98%', alignSelf: 'center', justifyContent: 'space-between', marginVertical: 10}}>
        <View style={{flexDirection:'row',alignItems:'center', width: '80%'}}>
            <Image source={images.avatarSm} />
            <View style={{marginLeft: 8}}>
                <Text style={{color: 'black',fontSize: wp('3.5%'), width:'80%'}}><Text style={{color: colors.themeDarkOrange}}>{name}</Text> <Text style={{color: 'grey'}}>{content}</Text></Text>
            </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
            <Entypo name="dots-three-horizontal" size={25} color={colors.iconPurple}   />
            <Text style={{color: 'black',fontSize: wp('3.2%'), textAlign: "right" , color: 'grey'}}>9:41 am</Text>
        </View>
      </View>

     
      
     
    </View>
  )
}

export default NotificationCard

const styles = StyleSheet.create({})