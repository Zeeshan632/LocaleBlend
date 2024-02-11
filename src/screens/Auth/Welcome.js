import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import images from '../../assets/images';
import colors from '../../theme/colors';
import Button from '../../components/Button';

const Welcome = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: '100%',
          justifyContent: 'space-around',
        }}>
        <Image source={images.logoSm} />
        <Image source={images.introImg4} />
        <Text
          style={{
            fontSize: wp('7%'),
            width: '80%',
            fontWeight: 'bold',
            color: 'black',
          }}>
          Join the community today and{' '}
          <Text style={{color: colors.themeColorOrange}}>connect</Text> with{' '}
          <Text style={{color: colors.themeColorOrange}}>new friends</Text>
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '40%'}}>
            <Button
              onPress={() => navigation.navigate('Signup')}
              buttonText="Create Account"
              textColor="white"
              fontSize={wp('4.5%')}
              style={{backgroundColor: colors.themeColorBlack}}
            />
          </View>
          <View style={{width: '35%', marginLeft: 20}}>
            <Button
              onPress={() => navigation.navigate('Login')}
              buttonText="Login"
              textColor="white"
              fontSize={wp('4.5%')}
              style={{backgroundColor: colors.themeColorOrange}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
