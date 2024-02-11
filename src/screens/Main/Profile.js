import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {logout} from '../../redux/AuthSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import NotificationCard from '../../components/NotificationCard';
import Header from '../../components/Header';
import ProfileCard from '../../components/ProfileCard';
import images from '../../assets/images';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.authData);
  const {seller} = useSelector(state => state.authData);

  const onLogoutPress = () => {
    dispatch(logout());
  };
  const showAlert = () =>
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: onLogoutPress},
    ]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Header navigation={navigation} onSearchIconPress={() => navigation.navigate('SearchingScreen')} />
        </View>

        <View
          style={styles.internalCont}>
          <Text
            style={{
              color: 'black',
              fontSize: wp('6%'),
              fontWeight: 'bold',
              margin: 15,
            }}>
            Profile
          </Text>
          <View style={{marginVertical: 10}}>
            <ProfileCard
              profileImage={data.profile_image}
              username={data.name ? data.name : 'Not Found'}
              email={data.email ? data.email : 'Not Found'}
              onPress={() =>
                navigation.navigate('EditProfile', {source: data.profile_image})
              }
            />
          </View>

          {/* View my profile button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile')}
            style={{backgroundColor: 'white', padding: 20, borderRadius: 15}}>
            <Text style={{color: 'black', fontSize: wp('5%')}}>
              View My Profile
            </Text>
          </TouchableOpacity>

          {/* Become a seller button */}
          <TouchableOpacity
            onPress={() =>
              seller
                ? navigation.navigate('MyProducts')
                : navigation.navigate('SetupYourShop')
            }
            style={{
              backgroundColor: colors.themeColorOrange,
              padding: 20,
              borderRadius: 15,
              marginTop: 10,
            }}>
            <Text style={{color: 'white', fontSize: wp('5%')}}>
              {seller ? 'Switch To Seller' : 'Become A Seller'}
            </Text>
          </TouchableOpacity>

          {/* Matches button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Matches')}
            style={styles.matches}>
            <Text style={styles.buttonText}>Your Matches</Text>
            <FontAwesome
              name="handshake-o"
              color={colors.themeColorOrange}
              size={25}
            />
          </TouchableOpacity>

          <View style={{backgroundColor: 'white', borderRadius: 15, marginTop: 10}}>

            {/* Account Settings button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AccountSettings")}
              style={{backgroundColor: 'white', padding: 20, borderRadius: 15}}>
              <Text style={{color: 'black', fontSize: wp('5%')}}>
                Account Settings
              </Text>
            </TouchableOpacity>

            <View style={styles.horLine}/>

            {/* Privacy Button */}
            <TouchableOpacity
              style={{backgroundColor: 'white', padding: 20, borderRadius: 15}}>
              <Text style={{color: 'black', fontSize: wp('5%')}}>
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <View style={styles.horLine}/>

            {/* Terms & Conditions Button */}
            <TouchableOpacity
              style={{backgroundColor: 'white', padding: 20, borderRadius: 15}}>
              <Text style={{color: 'black', fontSize: wp('5%')}}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>

            <View style={styles.horLine}/>

            {/* Billing & Information Button */}
            <TouchableOpacity
              style={{backgroundColor: 'white', padding: 20, borderRadius: 15}}>
              <Text style={{color: 'black', fontSize: wp('5%')}}>
                Billing Information
              </Text>
            </TouchableOpacity>

            <View style={styles.horLine}/>

            {/* Log out Button */}
            <TouchableOpacity
              style={{backgroundColor: 'white', padding: 20, borderRadius: 15}}
              onPress={showAlert}>
              <Text style={{color: '#FF7D7D', fontSize: wp('5%')}}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  horLine: {
    backgroundColor: 'lightgrey',
    width: '90%',
    height: 1,
    alignSelf: 'center',
  },
  internalCont: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 25,
    marginVertical: 15,
    alignSelf: 'center',
    padding: 15,
  },
  matches: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    marginTop: 10,
    borderColor: colors.themeColorOrange,
    borderWidth: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {color: colors.themeColorOrange, fontSize: wp('5%')}
});
