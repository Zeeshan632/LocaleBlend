import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {Camera} from 'react-native-vision-camera';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message'
import endpoint from '../../utils/endpoint'
import FastImage from 'react-native-fast-image';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Button2 from '../../components/Button2';
import ImagePicker from 'react-native-image-crop-picker';
import { createThumbnail } from "react-native-create-thumbnail";

const CreateNew = ({navigation}) => {
  const [postType, setPostType] = useState('');

  const [postText, setPostText] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [pickedVideo, setPickedVideo] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false)
  const {token} = useSelector(state => state.authData)
  const userData = useSelector(state => state.authData.data)

  let data = new FormData();
  data.append('text', postText);
  data.append('image', pickedImage !== ''? {
      name: 'image',
      type: pickedImage.mime,
      uri: pickedImage.path
  } : '')
  data.append('video', pickedVideo !== '' ? {
    name: 'video',
    type: 'video/mp4',
    uri: pickedVideo.path
  } : '')
  data.append('thumbnail', thumbnail !== ''? {
      name: 'thumbnail',
      type: thumbnail.mime,
      uri: thumbnail.path
  } : '')



  let config = {
    method: 'post',
    url: `${endpoint.endpointUrl}/post`,
    headers: { 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
    data : data
  };
  const onPostPress = () => {
    console.log("logged while posting =========================", pickedVideo)

    if(postText){
      setLoading(true)
      // console.log()
      axios(config)
        .then(function (response) {
          console.log("response message from post", response.data);
          if(response.data.success){
            setLoading(false)
            setPostText('')
            setPickedImage('')
            setPickedVideo('')
            setThumbnail('')
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: "You posted successfully"
            })
          }
        })
        .catch(function (error) {
          setLoading(false)
          console.log(error)
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: error.message
          })
        });
    }else {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "You can't leave text field empty"
      })
    }
  }

  // const openCamera = () => {
  //     console.log('Hello Wird')
  //     ImagePicker.openCamera({
  //         cropping: true,
  //     }).then(image => {
  //         console.log(image);
  //     })
  // }
  const pickVideo = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'video',
    }).then(video => {
      setPickedVideo(video);
      createThumbnail({
        url: video.path,
        timeStamp: 10000,
      }).then(response => setThumbnail(response)).catch(err => console.log({ err }));
    });
  }
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true
    }).then(image => {
      setPickedImage(image);
    });
  }

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Header navigation={navigation} onSearchIconPress={() => navigation.navigate("SearchingScreen")}/>
        </View>

        <View style={styles.internalContainer}>
          <Text style={styles.heading}>Spill it</Text>
          <View style={styles.top}>
            <View style={styles.topInfoContainer}>
              <View style={styles.userInfo}>
                {userData.profile_image ? <FastImage source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${userData.profile_image}`}} style={{width: wp('15%'), height: hp('7%'), borderRadius: 15}} /> : <Image source={images.profilePlaceholder} style={styles.image} /> }
                <Text style={styles.username}>{userData.name}</Text>
              </View>
            </View>

            {postType === '' ? (
              // if the post type is empty then this will render
              <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '70%', alignSelf: 'center', marginVertical: 20}}>
                <Button2 buttonText="Image" onPress={() => setPostType('text')} icon={<Ionicons name='document-text' size={20} color={colors.themeColorOrange} />} />
                <Button2 buttonText="Video" onPress={() => setPostType('video')}  icon={<Image source={images.videoIcon} style={{tintColor: colors.themeColorOrange}} />}/>
              </View>
            ) : postType === 'text' ? (
              // if the post type is text then this will render
              <>
                <TextInput
                  placeholder="What's on your mind?"
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={postText}
                  onChangeText={(changedText) => setPostText(changedText) }
                  style={styles.textInputStyle}
                />
                <View style={styles.postBtnContainer}>
                  {
                    pickedImage === '' ? (
                      <Button
                        buttonText="Upload Image"
                        style={{backgroundColor: colors.themeLightOrange}}
                        textColor={colors.themeColorOrange}
                        icon={
                          <Entypo
                            name="upload"
                            size={25}
                            color={colors.themeColorOrange}
                            style={{marginBottom: 6}}
                          />
                        }
                        onPress={pickImage}
                      />
                    ) : (
                      <View style={{width: '100%', height: hp('20%')}}>
                        <Entypo onPress={() => setPickedImage('')} name='circle-with-cross' size={25} color='black' style={styles.crossIcon} />
                        <Image source={{uri: pickedImage?.path}} style={{width: '100%', height: hp('20%'), borderRadius: 20}} resizeMode='cover' />
                      </View>
                    )
                  }

                </View>
                <View
                  style={styles.postBtnContainer}>
                  <Button
                    buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Post"}
                    style={{backgroundColor: colors.themeColorOrange}}
                    textColor="white"
                    onPress={onPostPress}
                    disabled={loading}
                  />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button2 buttonText="Video" onPress={() => setPostType('video')} icon={<Image source={images.videoIcon} style={{tintColor: colors.themeColorOrange}} />} />
                </View>
              </>
            ) : postType === 'video' ? (
              // if the post type is video then this will render
              <>
                <TextInput
                  placeholder="Add a Caption"
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={postText}
                  onChangeText={(changedText) => setPostText(changedText) }
                  style={styles.textInputStyle}
                />
                <View style={styles.postBtnContainer}>
                  {
                    thumbnail === '' ? (
                      <Button
                        buttonText="Upload Video"
                        style={{backgroundColor: colors.themeLightOrange}}
                        textColor={colors.themeColorOrange}
                        icon={
                          <Entypo
                            name="upload"
                            size={25}
                            color={colors.themeColorOrange}
                            style={{marginBottom: 6}}
                          />
                        }
                        onPress={pickVideo}
                      />
                    ) : (
                      <View style={{width: '100%', height: hp('20%')}}>
                        <Entypo onPress={() => [setPickedVideo(''), setThumbnail('')]} name='circle-with-cross' size={25} color='black' style={styles.crossIcon} />
                        <AntDesign name='play' size={50} color='black' style={styles.playIcon} />
                        <Image source={{uri: thumbnail.path}} style={{width: '100%', height: hp('20%'), borderRadius: 20}} resizeMode='cover' />
                      </View>
                    )
                  }

                </View>
 
                <View style={styles.postBtnContainer}>
                  <Button
                    buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Post"}
                    style={{backgroundColor: colors.themeColorOrange}}
                    textColor="white"
                    onPress={onPostPress}
                    disabled={loading}
                  />
                </View>
                <View style={styles.buttonsContainer}>
                  <Button2 buttonText="Image" onPress={() => setPostType('text')} icon={<Ionicons name='document-text' size={20} color={colors.themeColorOrange} />}/>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNew;

const styles = StyleSheet.create({
  videoButton: {
    flexDirection: 'row',
    backgroundColor: colors.themeLightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 15,
    borderRadius: 15,
  },
  lockIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  internalContainer: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 25,
    marginTop: 5,
    alignSelf: 'center',
    padding: 15,
  },
  heading: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    margin: 15,
  },
  top: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
  },
  topInfoContainer: {
    flexDirection: 'row',
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: 'black',
    fontSize: wp('4.5%'),
    marginLeft: 8,
  },
  buttonText: {
    color: colors.themeDarkBrown,
    marginLeft: 6,
    fontSize: wp('4%'),
    fontWeight: '500',
  },
  captionInput: {
    backgroundColor: '#F2F2F2',
    padding: 20,
    margin: 10,
    marginBottom: -5,
    borderRadius: 25,
  },
  buttonsContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  textInputStyle: {
    backgroundColor: '#F2F2F2',
    padding: 20,
    margin: 10,
    marginBottom: -5,
    borderRadius: 25,
  },
  postBtnContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 18,
    alignSelf: 'center',
  },
  crossIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 30,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 50
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 250,
    resizeMode: 'cover',
    borderColor: 'black',
  },
  playIcon: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    zIndex: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 2
  }
});
