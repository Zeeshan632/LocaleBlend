import {StyleSheet, Text, View, StatusBar, ActivityIndicator, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ImageCropPicker from 'react-native-image-crop-picker';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../theme/colors';
import images from '../../assets/images';
import Foundation from 'react-native-vector-icons/Foundation'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import enpoint from '../../utils/endpoint';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/AuthSlice';

const EditProfile = ({navigation, route}) => {
  const {token, data} = useSelector(state => state.authData)
  const [loading, setLoading] = useState(false)
  const [imagePicked, setImagePicked] = useState(false)
  const [imageSource, setImageSource] = useState('')
  // const currentUserFBId = auth().currentUser.uid

  const [inputData, setInputData] = useState({
    firstName: data.name,
  })

  const dispatch = useDispatch()
  const {source} = route.params;

  const selectImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true
    }).then(image => {
      setImagePicked(true)
      setImageSource(image.path)
    })
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setImageSource(source)
      setImagePicked(false)
    })
    return unsubscribe;
  }, [navigation])

  
  
  let dataToBeAppend = new FormData();
  dataToBeAppend.append('name', inputData.firstName);
  {imageSource && imagePicked ? dataToBeAppend.append('profile_image', {
    name: "image.jpg",
    type: "image/jpeg",
    uri: imageSource
  }): null}

  let config = {
    method: 'post',
    url: `${enpoint.endpointUrl}/update-info`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`, 
    },
    data : dataToBeAppend
  };

  const onUpdatePress = () => {
    
    if(inputData.firstName){
      setLoading(true)
      axios(config)
      .then(function (response) {

        if(response.data.success){
          if(imagePicked){
            
          const randomRef = Math.ceil(Math.random() * 1000000)
          storage().ref(`${randomRef}`).putFile(imageSource).then(() => {
            storage().ref(`${randomRef}`).getDownloadURL().then((downloadUrl) => {
              firestore().collection('users').doc(`${data.id}`).update({
                profileImage: downloadUrl,
                name: inputData.firstName
              }).then(() => {

                setLoading(false)
                navigation.navigate('Profile')
                dispatch(updateUserData(response.data.data))
                Toast.show({
                  type: 'success',
                  text1: 'Success',
                  text2: 'Profile updated successfully'
                })

              }).catch(err => {
                setLoading(false)
                Toast.show({
                  type: 'error',
                  text1: 'Warning',
                  text2: 'Something went wrong'
                })
                console.log(err)
              })
            })
          })

        } else {
          firestore().collection('users').doc(`${data.id}`).update({
            name: inputData.firstName
          }).then(() => {

            setLoading(false)
            navigation.navigate('Profile')
            dispatch(updateUserData(response.data.data))
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Profile updated successfully'
            }).catch(err => {
              setLoading(false)
              Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: 'Something went wrong'
              })
              console.log(err)
            })

          })
        }

        }else {
            Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: response.data.message
            })
        }
      })
      .catch(function (error) {
          console.log(error)
          setLoading(false)
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: error.message
          })
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "You can't leave the name field empty"
      });
    }

  }
  const onInputChange = (dataKey, changedText) => {
    setInputData(oldData => {
      return {...oldData, [dataKey]: changedText}
    })
  }
  
  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <StatusBar backgroundColor={colors.lightPink} />
      <View>
        <Header navigation={navigation} />
      </View>
      <Text style={styles.heading}>Edit Profile</Text>

        <View style={{width: '90%', marginVertical: 15, alignSelf: 'center'}}>
          <View style={{width: '100%', marginBottom: 15}}>
            <TouchableOpacity activeOpacity={0.6} onPress={selectImage}>
              {imageSource && !imagePicked ? <FastImage source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${imageSource}`}} style={styles.image} /> : imagePicked ? <FastImage source={{uri: imageSource}} style={styles.image} /> : <Image source={images.profilePlaceholder} style={styles.image} /> }
              <Foundation name='pencil' color={'white'} size={15} style={styles.editIcon} />
            </TouchableOpacity>
            
            <Input
              placeholder="Your new name"
              placeholderColor="grey"
              keyboardType="default"
              value={inputData.firstName}
              onChange={(changedText) => onInputChange('firstName', changedText)}
              style={styles.input}
            />
          </View>

          <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
            <Button
              onPress={onUpdatePress}
              disabled={loading}
              buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Update"}
              fontSize={wp('5%')}
              textColor="white"
              style={{backgroundColor: colors.themeColorOrange}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  heading: {
    fontSize: wp('8%'),
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 25
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 250,
    resizeMode: 'cover',
    borderColor: 'black',
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    marginTop: 20
  },
  editIcon: {
    // backgroundColor: colors.themeDarkBrown,
    backgroundColor:'black',
    position: 'absolute',
    bottom: 0,
    left: '57%',
    padding: 6,
    paddingHorizontal: 8,
    borderRadius: 50
  }
});
