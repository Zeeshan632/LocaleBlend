import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import images from '../assets/images';
import FastImage from 'react-native-fast-image';

const ReactionBar = ({username, userAvatar, reactionIcon}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
            {userAvatar ? <FastImage source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${userAvatar}`}} style={{width: wp('15%'), height: hp('7%'), borderRadius: 50}} /> : <Image source={images.profilePlaceholder} style={styles.image} /> }
            <Text style={styles.username}>{username}</Text>
        </View>
        <Image source={images[reactionIcon]} />
    </View>
  )
}

export default ReactionBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    username: {
        fontSize: wp('5%'),
        marginLeft: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 250,
        resizeMode: 'cover',
        borderColor: 'black',
      },
})