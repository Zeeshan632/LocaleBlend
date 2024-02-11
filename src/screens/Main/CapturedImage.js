import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CapturedImage = ({route, navigation}) => {
  const {imagePath} = route.params;

  return (
    <ImageBackground style={{flex: 1}} source={{uri: `file://${imagePath}`}}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <AntDesign
        name="left"
        size={30}
        color="white"
        style={{
          marginTop: 50,
          marginLeft: 20,
          alignSelf: 'flex-start',
          padding: 5,
        }}
        onPress={() => navigation.navigate('CreateNew')}
      />
      <View
        style={{
          width: '100%',
          height: hp('25%'),
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: '85%',
            backgroundColor: 'white',
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'white',
          }}>
          <Text
            style={{
              color: colors.themeColorOrange,
              fontSize: wp('4%'),
              paddingVertical: 16,
            }}>
            Add to Highlights
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            width: '85%',
            backgroundColor: colors.themeColorOrange,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.themeColorOrange,
            marginTop: 10,
          }}>
          <Text
            style={{color: 'white', fontSize: wp('4%'), paddingVertical: 16}}>
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default CapturedImage;

const styles = StyleSheet.create({});
