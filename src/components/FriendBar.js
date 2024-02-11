import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import images from '../assets/images';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../theme/colors';
import Button from './Button';
import FastImage from 'react-native-fast-image';

const FriendBar = ({id, username, userProfileImage, age, onRemovePress=false}) => {
  return (
    <View style={styles.container}>
      <View style={styles.internalCont}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {userProfileImage ? <FastImage
            source={{
              uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${userProfileImage}`,
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'lightgrey',
              borderRadius: 10,
            }}
          /> : <Entypo name='user' color={'black'} size={hp('6%')} /> }
          <View style={{marginLeft: 8}}>
            <Text
              style={{
                color: 'black',
                fontSize: hp('2.6%'),
                fontWeight: 'bold',
              }}>
              <Text style={{color: colors.themeDarkOrange}}>{username}</Text>
              {`\n`}
              <Text style={{color: 'grey', fontSize: hp('2%')}}>{age}</Text>
            </Text>
          </View>
        </View>
        
        {
          onRemovePress ? (
            <Button
              buttonText={'Remove'}
              onPress={() => onRemovePress(id)}
              style={{
                backgroundColor: colors.themeColorOrange,
                height: hp('4.2%'),
                width: wp('21%'),
                borderRadius: 10,
              }}
              textColor={'white'}
            />
          ) : null
        }

      </View>
    </View>
  );
};

export default FriendBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 10,
    alignItems: 'center',
    width: wp('90%'),
  },
  internalCont: {
    flexDirection: 'row',
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
});
