import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import images from '../assets/images';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../theme/colors';
import Button from './Button';
import FastImage from 'react-native-fast-image'

const ChatCard = ({
  username,
  userAvatar,
  lastMessage,
  lastMessageTime,
  onPress
}) => {
  const date = new Date(lastMessageTime);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{backgroundColor: 'white', borderRadius: 16, padding: 10}}>
      <View style={styles.internalContainer}>

        {/* left container that has username, profilepc and last message */}
        <View style={styles.leftContainer}>
        {userAvatar ? <FastImage source={{uri: userAvatar}} style={styles.image} /> : <Image source={images.profilePlaceholder} style={styles.image} /> }
          <View style={{marginLeft: 8}}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
          </View>
        </View>

        {/* right Container that has menu icon and time */}
        <View style={{alignItems: 'flex-end', width: '30%', marginTop: 15}}>
          <Text style={styles.lastMessageTime}>{date.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  internalContainer: {
    flexDirection: 'row',
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  leftContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '60%',
    overflow:'hidden'
  },
  username: {
    color: 'black', 
    fontSize: wp('4.5%'),
    fontWeight:'bold'
  },
  lastMessage: {
    color: 'black',
    fontSize: wp('3%'),
    width: '75%',
    color: 'grey',
    width:'100%'
  },
  lastMessageTime: {
    color: 'black',
    fontSize: wp('3.2%'),
    textAlign: 'right',
    color: 'grey',
  },
  image: {
    width: wp('14%'),
    height: hp('7%'),
    borderRadius: 10,
    resizeMode: 'cover',
    borderColor: 'black',
    alignSelf: 'center'
  },
});
