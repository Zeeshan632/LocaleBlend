import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
// import images from '../../assets/images'
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BackIcon = ({onBackPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={onBackPress}
        activeOpacity={0.6}
        style={[styles.iconButton, {marginLeft: -15}]}>
        <AntDesign name="arrowleft" size={25} color={colors.themeColorOrange} />
      </TouchableOpacity>
    </View>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'white',
    width: wp('13%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
