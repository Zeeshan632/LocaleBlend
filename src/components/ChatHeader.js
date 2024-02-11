import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import colors from '../theme/colors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'

const ChatHeader = ({userData, navigatedFrom, onBackPress, onBlockPress, onDeletePress, blocked, onUnblockPress}) => {
    const [openOptions, setOpenOptions] = useState(false)

  return (
    <View style={styles.container}>
        <AntDesign onPress={onBackPress} name="arrowleft" size={25} color={colors.themeColorOrange} style={{ padding: 10, marginRight: 5}} />
        <FastImage style={styles.image} source={{uri: navigatedFrom === 'chats' ? userData.user_profile_image : `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${userData.user_profile_image}`}} />
        <Text style={styles.name}>{userData.user_name}</Text>

        <TouchableOpacity style={styles.options} onPress={() => setOpenOptions(!openOptions)}>
            <Entypo name='dots-three-vertical' color={'black'} size={25} />
        </TouchableOpacity>

        <View style={[styles.optionsCont, !openOptions ? {display: 'none'} : null]}>
            <TouchableOpacity onPress={() =>  {
                {blocked ? onUnblockPress() : onBlockPress()}
                setOpenOptions(false)
            }}><Text style={styles.text}>{blocked ? 'Unblock' : 'Block'}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                onDeletePress()
                setOpenOptions(false)
            }}><Text style={[styles.text, {borderBottomWidth: 0}]}>Delete Chat</Text></TouchableOpacity>
        </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    container: {
        width:'100%',
        backgroundColor: 'white',
        borderRadius: 0,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: colors.themeDarkBrown,
        paddingBottom: 13
    },
    image: {
        width: wp('13%'),
        height: hp('6%'),
        backgroundColor: colors.themeDarkOrange,
        borderRadius: 8
    },
    name: {
        color: colors.themeDarkBrown,
        marginLeft: 10,
        fontSize: hp('3%'),
        fontWeight: 'bold',
    },
    options: {
        position: 'absolute',
        right: 10,
        padding: 5
    },
    optionsCont: {
        borderWidth: 1,
        // padding: 15,
        position: 'absolute',
        top: 50, right: 15,
        backgroundColor: 'white',
        borderRadius: 8
    },
    text: {
        color:'black',
        padding: 7.5,
        borderBottomWidth: 1
    }
})