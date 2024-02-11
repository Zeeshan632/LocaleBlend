import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import images from '../../assets/images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../../components/Button';
import Header from '../../components/Header';

const WritePost = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Header navigation={navigation} />
        </View>

        <View
          style={{
            width: '95%',
            backgroundColor: colors.lightPink,
            borderRadius: 25,
            marginTop: 5,
            alignSelf: 'center',
            padding: 15,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: wp('6%'),
              fontWeight: 'bold',
              margin: 15,
            }}>
            Spill out
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 25,
              padding: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '98%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.avatarSm} />
                <View style={{marginLeft: 8}}>
                  <Text style={{color: 'black', fontSize: wp('4.5%')}}>
                    Katy queen 014
                  </Text>
                </View>
              </View>
              <Entypo
                name="dots-three-horizontal"
                size={25}
                color="lightgrey"
                style={{marginRight: 6}}
              />
            </View>
            <TextInput
              placeholder="What's on your mind?"
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
              style={{
                backgroundColor: '#F2F2F2',
                padding: 20,
                margin: 10,
                marginBottom: -5,
                borderRadius: 25,
              }}
            />

            <TouchableOpacity style={styles.videoButton}>
              <Image source={images.videoIcon} />
              <Text
                style={{
                  color: colors.themeDarkBrown,
                  marginLeft: 6,
                  fontSize: wp('4%'),
                  fontWeight: '500',
                }}>
                Video
              </Text>
              <TouchableOpacity style={styles.lockIcon}>
                <Image source={images.lockIcon} />
              </TouchableOpacity>
            </TouchableOpacity>

            <View style={{width: '90%', alignSelf: 'center'}}>
              <Button
                buttonText="Post"
                style={{backgroundColor: colors.themeDarkBrown}}
                textColor="white"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WritePost;

const styles = StyleSheet.create({
  videoButton: {
    flexDirection: 'row',
    backgroundColor: colors.themeLightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 15,
    margin: 15,
    borderRadius: 15,
  },
  lockIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
});
