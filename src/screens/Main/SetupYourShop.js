import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {updateSellerState} from '../../redux/AuthSlice';

import Header from '../../components/Header';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import endpoint from '../../utils/endpoint';
import ShopHeader from '../../components/ShopHeader';

const SetupYourShop = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {token} = useSelector(state => state.authData);

  const [pickedImage, setPickedImage] = useState('');
  const [inputData, setInputData] = useState({
    shopName: '',
    description: '',
  });

  const Dispatch = useDispatch();

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      setPickedImage(image);
    });
  };

  let data = new FormData();
  data.append('image', {
    name: 'image',
    type: pickedImage.mime,
    uri: pickedImage.path,
  });
  data.append('shop_name', inputData.shopName);
  data.append('shop_description', inputData.description);

  let config = {
    method: 'post',
    url: `${endpoint.endpointUrl}/create-shop`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const handleProceed = () => {
    setLoading(true);

    if (pickedImage && inputData.shopName && inputData.description) {
      axios(config)
        .then(response => {
          setLoading(false);
          if (response.data.success) {
            Dispatch(updateSellerState());
            navigation.navigate('AddFirstProduct', {first: true});

            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Shop created successfully',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: 'Something went wrong',
            });
          }
        })
        .catch(error => {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: error.message,
          });
        });
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "You can't leave field empty",
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <ShopHeader
            onBackPress={() => navigation.goBack()}
            inShop={true}
            navigation={navigation}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.topContainer}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              color={'grey'}
              size={28}
            />
            <Text style={styles.heading}>Setup your shop</Text>
          </View>
          <View style={styles.inputsContainer}>
            <View style={styles.imagesContainer}>
              <Text style={styles.imageHeading}>
                Select an Image for your shop
              </Text>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.6}
                style={styles.imageSelector}>
                {pickedImage ? (
                  <Image
                    source={{uri: pickedImage.path}}
                    style={styles.imageSelector}
                  />
                ) : (
                  <AntDesign
                    name="plus"
                    color={colors.themeColorOrange}
                    size={18}
                  />
                )}
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Shop name"
              placeholderTextColor={colors.themeDarkOrange}
              value={inputData.shopName}
              onChangeText={changedText =>
                setInputData({...inputData, ['shopName']: changedText})
              }
              style={styles.input}
            />

            <TextInput
              placeholder="Tell us about your shop"
              placeholderTextColor={colors.themeDarkOrange}
              value={inputData.description}
              onChangeText={changedText =>
                setInputData({...inputData, ['description']: changedText})
              }
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
            />
            <View style={{width: '98%', alignSelf: 'center', marginTop: 15}}>
              <Button
                onPress={handleProceed}
                buttonText={
                  loading ? (
                    <ActivityIndicator color="white" size={35} />
                  ) : (
                    'Save & Proceed'
                  )
                }
                style={{
                  backgroundColor: colors.themeColorOrange,
                  borderRadius: 10,
                }}
                textColor={'white'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SetupYourShop;

const styles = StyleSheet.create({
  topOf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    alignSelf: 'center',
    marginVertical: 12,
    marginBottom: 20,
  },
  smaller: {
    fontSize: hp('2.2%'),
    color: 'rgba(0,0,0,0.7)',
    letterSpacing: 0.8,
  },
  container: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 10,
    alignSelf: 'center',
    padding: 15,
    marginTop: 20,
  },
  topContainer: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: '900',
    marginVertical: 15,
    marginLeft: 15,
  },
  inputsContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#FFE9D5',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    alignItems: 'center',
  },
  imageSelector: {
    backgroundColor: '#FFE9D5',
    borderRadius: 15,
    width: wp('27%'),
    height: hp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHeading: {
    width: '40%',
    fontWeight: 'bold',
  },
});
