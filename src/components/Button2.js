import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import images from '../assets/images';
import colors from '../theme/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button2 = ({onPress, buttonText, icon=false, lockIcon=false, style}) => {
  return (
    <TouchableOpacity
      style={[styles.videoButton, style]}
      activeOpacity={0.5}
      onPress={onPress}>
        {icon ? icon : null}
      <Text style={styles.buttonText}>{buttonText}</Text>
      {
        lockIcon ? (
            <TouchableOpacity style={styles.lockIcon} activeOpacity={0.5}>
                <Image source={images.lockIcon} />
            </TouchableOpacity>
        ) : null
      }

    </TouchableOpacity>
  );
};

export default Button2;

const styles = StyleSheet.create({
  videoButton: {
    flexDirection: 'row',
    backgroundColor: colors.themeLightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    width: wp('25%')
  },
  lockIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  buttonText: {
    color: colors.themeColorOrange,
    marginLeft: 6,
    fontSize: wp('4%'),
    fontWeight: '500',
    // backgroundColor: 'blue',
  },
});
