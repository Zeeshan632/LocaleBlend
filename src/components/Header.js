import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// import images from '../../assets/images'
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../theme/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Header = ({inShop=false, navigation, onSearchIconPress}) => {
  return (
    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginVertical: 20}}>
        <Image source={images.screenLogo} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Shop')} activeOpacity={0.6} style={[styles.iconButton, inShop ? {backgroundColor: colors.themeColorOrange} : null]}>
            <Image source={images.shopIcon} style={inShop ? {tintColor: 'white'} : null} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onSearchIconPress}  activeOpacity={0.6} style={styles.iconButton}>
            <AntDesign name="search1" size={24} color={colors.themeColorOrange} />
          </TouchableOpacity>

        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconButton: {
    backgroundColor:'white',
    width:wp('13%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  }
})