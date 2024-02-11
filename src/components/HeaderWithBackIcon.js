import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
// import images from '../../assets/images'
import images from '../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeaderWithBackIcon = ({
  inShop = false,
  navigation,
  onBackPress,
  searchText,
  setSearchText,
  placeholder,
}) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <View style={styles.container}>
      {!showInput ? (
        <>
          <TouchableOpacity
            onPress={onBackPress}
            activeOpacity={0.6}
            style={[styles.iconButton, {marginLeft: -5}]}>
            <AntDesign
              name="arrowleft"
              size={25}
              color={colors.themeColorOrange}
            />
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Shop')}
              activeOpacity={0.6}
              style={[
                styles.iconButton,
                inShop ? {backgroundColor: colors.themeColorOrange} : null,
              ]}>
              <Image
                source={images.shopIcon}
                style={inShop ? {tintColor: 'white'} : null}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowInput(true)} activeOpacity={0.6} style={styles.iconButton}>
              <AntDesign
                name="search1"
                size={24}
                color={colors.themeColorOrange}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={onBackPress}
            activeOpacity={0.6}
            style={[styles.iconButton, {marginLeft: -5}]}>
            <AntDesign
              name="arrowleft"
              size={25}
              color={colors.themeColorOrange}
            />
          </TouchableOpacity>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.themeColorLightOrange}
            autoFocus={true}
          />
        </View>
      )}
    </View>
  );
};

export default HeaderWithBackIcon;

const styles = StyleSheet.create({
  container: {
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
  input: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
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
