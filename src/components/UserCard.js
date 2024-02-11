import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import TinderCard from 'react-tinder-card';
import images from '../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

const UserCard = ({name, userId, onSwipe, age, profileImage}) => {
  return (
    <TinderCard
      className="swipe"
      key={userId}
      preventSwipe={['up', 'down']}
      style={styles.tinderCard}
      onSwipe={(direction) => onSwipe(direction, userId)}>
      <View style={styles.container}>
        <FastImage
          source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${profileImage}`}}
          style={{width: '100%', height: '100%'}}
        />
        <View style={{position: 'absolute', bottom: 20, left: 20, backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 15}}>
          <Text
            style={{fontSize: wp('8%'), fontWeight: 'bold', color: 'white'}}>
            {name} <Text style={{fontSize: wp('5%')}}>{age} {'\n'}New York </Text>
          </Text>
        </View>
      </View>
    </TinderCard>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('55%'),
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
