import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  BackHandler
} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import endpoint from '../../utils/endpoint';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import axios from 'axios';
import ShopHeader from '../../components/ShopHeader';

const AddFirstProduct = ({navigation, route}) => {
  const {first} = route.params;
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const {token} = useSelector(state => state.authData);

  const handleBackButtonClick = () => {
    navigation.navigate('Shop');
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);
  
  const [pickedImage1, setPickedImage1] = useState('');
  const [pickedImage2, setPickedImage2] = useState('');
  const [pickedImage3, setPickedImage3] = useState('');
  const [pickedImage4, setPickedImage4] = useState('');
  const [pickedImage5, setPickedImage5] = useState('');

  const [inputData, setInputData] = useState({
    productName: '',
    price: '',
    stock: '',
    description: '',
  })


  const pickImage = (imagePickingOrder) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true
    }).then(image => {
      switch(imagePickingOrder) {
        case '1':
          setPickedImage1(image);
          break;
        case '2':
          setPickedImage2(image);
          break;
        case '3':
          setPickedImage3(image);
          break;
        case '4':
          setPickedImage4(image);
          break;
        case '5':
          setPickedImage5(image);
          break;
      }
    });
  }

  const handleProceed = () => {
    let data = new FormData();
    data.append('image1', pickedImage1 !== '' ? {
      name: 'image',
      type: pickedImage1.mime,
      uri: pickedImage1.path
    } : '')
    data.append('image2', pickedImage2 !== '' ? {
      name: 'image',
      type: pickedImage2.mime,
      uri: pickedImage2.path
    } : '')
    data.append('image3', pickedImage3 !== '' ? {
      name: 'image',
      type: pickedImage3.mime,
      uri: pickedImage3.path
    } : '')
    data.append('image4', pickedImage4 !== '' ? {
      name: 'image',
      type: pickedImage4.mime,
      uri: pickedImage4.path
    } : '')
    data.append('image5', pickedImage5 !== '' ? {
      name: 'image',
      type: pickedImage5.mime,
      uri: pickedImage5.path
    } : '')
    data.append('product_name', inputData.productName);
    data.append('price', inputData.price);
    data.append('stock', inputData.stock);
    data.append('description', inputData.description);
    
    
    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/create-product`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      data : data
    };
    
    
    
    setLoading(true)
    if(pickedImage1 && pickedImage2 && pickedImage3){

      if(inputData.productName && inputData.price && inputData.stock && inputData.description){
        axios(config)
          .then((response) => {
            setLoading(false)
            if(response.data.success){
              setModalVisible(true)
            }else {
              Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: "Something went wrong"
              })
            }
          })
          .catch((error) => {
            setLoading(false)
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: error.message
            })
          });
      }else {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: "You can't leave any text field empty"
        })
      }
      
    } else {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: 'You have to upload at least 3 photos of your product',
      })
    }
    
  }


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
            {!first ? <AntDesign onPress={() => navigation.goBack()} name="arrowleft" color={'grey'} size={28} /> : null}
            <Text style={styles.heading}>{first ? 'Add your first product': 'Upload Products'}</Text>
          </View>
          <Text style={{color:'grey', margin: 10}}>Upload product images (min 3 - max 5)</Text>

          <View style={styles.imagesContainer}>
            <TouchableOpacity onPress={() => pickImage('1')} activeOpacity={0.6} style={styles.imageSelector}>
                {
                  pickedImage1 ? (
                    <Image source={{uri: pickedImage1.path}} style={styles.imageSelector} />
                    ) : (
                    <AntDesign name='plus' color={colors.themeColorOrange} size={18} />
                  )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage('2')} activeOpacity={0.6} style={styles.imageSelector}>
                {
                  pickedImage2 ? (
                    <Image source={{uri: pickedImage2.path}} style={styles.imageSelector} />
                    ) : (
                    <AntDesign name='plus' color={colors.themeColorOrange} size={18} />
                  )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage('3')} activeOpacity={0.6} style={[styles.imageSelector, {borderColor: colors.themeColorOrange, borderWidth: 1, backgroundColor: 'transparent'}]}>
                {
                  pickedImage3 ? (
                    <Image source={{uri: pickedImage3.path}} style={styles.imageSelector} />
                    ) : (
                    <AntDesign name='plus' color={colors.themeColorOrange} size={18} />
                  )
                }
            </TouchableOpacity>
          </View>
          {
            pickedImage3 ? (
              <View style={styles.imagesContainer}>
                <TouchableOpacity onPress={() => pickImage('4')} activeOpacity={0.6} style={styles.imageSelector}>
                  {
                    pickedImage4 ? (
                      <Image source={{uri: pickedImage4.path}} style={styles.imageSelector} />
                      ) : (
                      <AntDesign name='plus' color={colors.themeColorOrange} size={18} />
                    )
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickImage('5')} activeOpacity={0.6} style={[styles.imageSelector, {borderColor: colors.themeColorOrange, borderWidth: 1, backgroundColor: 'transparent'}]}>
                  {
                    pickedImage5 ? (
                      <Image source={{uri: pickedImage5.path}} style={styles.imageSelector} />
                      ) : (
                      <AntDesign name='plus' color={colors.themeColorOrange} size={18} />
                    )
                  }
                </TouchableOpacity>
              </View>
            ) : null
          }

          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Product name"
              placeholderTextColor={colors.themeDarkOrange}
              value={inputData.productName}
              onChangeText={(changedText) => setInputData({...inputData, ['productName']: changedText})}
              style={styles.input}
            />

            <View style={styles.internalCont}>
              <TextInput
                placeholder="Price per unit"
                placeholderTextColor={colors.themeDarkOrange}
                keyboardType='number-pad'
                value={inputData.price}
                onChangeText={(changedText) => setInputData({...inputData, ['price']: changedText})}
                style={styles.smallInput}
              />
              <TextInput
                placeholder="Stock (quantity)"
                placeholderTextColor={colors.themeDarkOrange}
                keyboardType='number-pad'
                value={inputData.stock}
                onChangeText={(changedText) => setInputData({...inputData, ['stock']: changedText})}
                style={styles.smallInput}
              />
            </View>
            <TextInput
              placeholder="Product Description"
              placeholderTextColor={colors.themeDarkOrange}
              value={inputData.description}
              onChangeText={(changedText) => setInputData({...inputData, ['description']: changedText})}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
            />
            <View style={styles.buttonsContainer}>
              <Button
                buttonText={loading ? <ActivityIndicator color='white' size={35} /> : 'Upload' }
                onPress={handleProceed}
                style={{
                  backgroundColor: colors.themeColorOrange,
                  borderRadius: 10,
                  width:'100%'
                }}
                textColor={'white'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible} onBackButtonPress={() => setModalVisible(false)}>
        <View style={{flex: 1, backgroundColor: colors.lightPink, borderRadius: 10, justifyContent:'center', alignItems: 'center'}}>
            <Image source={images.doneSign} />
            <Text style={[styles.heading, {textAlign: 'center', marginVertical: 25, marginLeft: 0, width:'85%'}]}>Your first product has been uploaded</Text>
            <Button
                buttonText={'PROCEED TO DASHBOARD'}
                onPress={() => [setModalVisible(false), navigation.navigate('MyProducts')]}
                style={{
                  backgroundColor: colors.themeColorOrange,
                  borderRadius: 10,
                  width: '90%',
                }}
                textColor={'white'}
              />
        </View>
      </Modal>
    </View>
  );
};

export default AddFirstProduct;

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
    marginVertical: 20,
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
  internalCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallInput: {
    backgroundColor: '#FFE9D5',
    width: '49%',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
  },
  buttonsContainer: {
    flexDirection:'row',
    justifyContent:'space-around',
    width: '98%', 
    alignSelf: 'center', 
    marginTop: 15
    },
    imagesContainer: {
        flexDirection:'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    imageSelector:{
        backgroundColor: '#FFE9D5',
        borderRadius: 15,
        width: wp('27%'),
        height : hp('13%'),
        justifyContent:'center',
        alignItems:'center'
    }
});
