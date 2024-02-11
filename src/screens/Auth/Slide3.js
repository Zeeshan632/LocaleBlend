import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import images from '../../assets/images'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../theme/colors'


const Slide3 = ({slider, navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', backgroundColor: 'white'}}>
      <Image source={images.logoSm} style={{marginTop: "-15%"}} />
      <Image source={images.slide3} style={{marginVertical: 60}} />
      <View style={{flexDirection:'row',justifyContent: 'space-between', width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <View>
          <Text style={{fontSize: wp('7.5%'), fontWeight: 'bold', color: 'black', alignSelf: 'flex-start', marginLeft: '5%'}}>
            share a coffee{'\n'}off the <Text style={{color: colors.themeColorOrange}}>sub</Text>
          </Text>
        </View>
        <Entypo onPress={() => navigation.navigate('Welcome')} name="chevron-right" size={25} color="white" style={{backgroundColor: colors.themeColorOrange, padding: 20, borderRadius: 50}} />
      </View>
    </View>
  )
}

export default Slide3

const styles = StyleSheet.create({})