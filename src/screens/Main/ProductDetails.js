import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import endpoint from '../../utils/endpoint';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import colors from '../../theme/colors';
import Button from '../../components/Button';
import StarRating from 'react-native-star-rating-widget';
import {AirbnbRating} from 'react-native-ratings';
import images from '../../assets/images';
import Modal from 'react-native-modal';
import Input from '../../components/Input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo'

const ProductDetails = ({route, navigation}) => {
  const {token} = useSelector(state => state.authData);
  const [productDetails, setProductsDetails] = useState({});
  const {productId} = route.params;
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(1);

  const url =
    'https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/product';
  const userImageUrl =
    'https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user';

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProductDetails();
      fetchReviews();
    });
    return unsubscribe;
  }, [navigation]);

  const decreaseCount = () => {
    setCount(count - 1)
    if(count <= 1){
      setIsVisible(false)
    }
  }

  const fetchReviews = () => {
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/review/${productId}`,
      headers: { 
        'Authorization': `Bearer ${token}`,
      }
    };
    
    axios(config)
      .then((response) => {
        if(response.data.success) {
          setAllReviews(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const submitReview = () => {
    let dataToBeAppend = new FormData();
    dataToBeAppend.append('product_id', productId);
    dataToBeAppend.append('message', reviewText);
    dataToBeAppend.append('star', rating);

    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/review`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      data : dataToBeAppend
    };

    setSubmitLoading(true)
    axios(config)
    .then((response) => {
      setSubmitLoading(false)
      if(response.data.success){
        setIsReviewVisible(false)
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your review has been submitted',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.message,
        });
      }
    })
    .catch((error) => {
      setSubmitLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: error.message,
      });
    });
  }

  const renderReviews = ({item}) => {

    return (
      <View
        style={styles.meainReviewCont}>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignSelf: 'center',
            alignSelf: 'center',
          }}>
          <Image source={item.user_profile_image ? {uri: `${userImageUrl}/${item.user_profile_image}`} : images.avatarSm} style={{width: 50,height: 50, backgroundColor: 'lightgrey', borderRadius: 8}} />
          <View style={{marginLeft: 10}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: hp('2.5%'),
              }}>
              {item.user_name}
            </Text>
            <Text style={{color: 'black', fontSize: hp('1.5%')}}>
              {item.created_at}
            </Text>
          </View>
          <AirbnbRating
            defaultRating={item.star}
            isDisabled={true}
            showRating={false}
            size={18}
            starContainerStyle={{marginTop: -25}}
          />
        </View>

        {item.message ? <Text style={styles.review}>{item.message}</Text> : null}
      </View>
    )
  }

  const fetchProductDetails = () => {
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/product-details/${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data.success) {
          setProductsDetails(response.data.data);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: response.data.message,
          });
        }
      })
      .catch(function (error) {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: error.message,
        });
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.6}
        style={styles.iconButton}>
        <AntDesign
          name="arrowleft"
          size={20}
          color={colors.themeColorOrange}
        />
      </TouchableOpacity>
      
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 65}}>
        <View
          style={{width: '100%', height: hp('30%'), backgroundColor: 'grey'}}>
          <Swiper
            showsButtons={true}
            dotColor={'grey'}
            activeDotColor={colors.themeColorOrange}
            nextButton={
              <Text
                style={{color: colors.themeColorOrange, fontSize: hp('8%')}}>
                ›
              </Text>
            }
            prevButton={
              <Text
                style={{color: colors.themeColorOrange, fontSize: hp('8%')}}>
                ‹
              </Text>
            }>
            {productDetails.image1 ? (
              <FastImage
                source={{uri: `${url}/${productDetails.image1}`}}
                style={styles.image}
              />
            ) : null}
            {productDetails.image2 ? (
              <FastImage
                source={{uri: `${url}/${productDetails.image2}`}}
                style={styles.image}
              />
            ) : null}
            {productDetails.image3 ? (
              <FastImage
                source={{uri: `${url}/${productDetails.image3}`}}
                style={styles.image}
              />
            ) : null}
            {productDetails.image4 ? (
              <FastImage
                source={{uri: `${url}/${productDetails.image4}`}}
                style={styles.image}
              />
            ) : null}
            {productDetails.image5 ? (
              <FastImage
                source={{uri: `${url}/${productDetails.image5}`}}
                style={styles.image}
              />
            ) : null}
          </Swiper>
        </View>

        <View
          style={{
            width: '93%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginTop: 25,
            marginBottom: 15,
          }}>
          <View style={{width: '80%'}}>
            <Text style={styles.title}>{productDetails.name}</Text>
            <Text style={styles.description}>{productDetails.description}</Text>
          </View>
          <Text style={styles.price}>${productDetails.price}</Text>
        </View>

        <View
          style={{
            width: '93%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.label}>Stock Left</Text>
          <Text style={styles.stock}>{productDetails.stock}</Text>
        </View>

        <View style={styles.reviewCont}>
          <Text style={styles.heading}>Reviews</Text>
          <View style={{width: wp('40%')}}>
            <Button
              buttonText={'Submit a Review'}
              style={{
                backgroundColor: colors.themeColorOrange,
                borderRadius: 8,
                height: hp('5%'),
              }}
              textColor={'white'}
              onPress={() => setIsReviewVisible(true)}
            />
          </View>
        </View>


        <FlatList
          // keyExtractor={({item}) => item.id}
          data={allReviews}
          renderItem={renderReviews}
        />

      </ScrollView>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
        }}>
        <Button
          buttonText={'BUY'}
          onPress={() => {setIsVisible(true), setCount(1)}}
          style={{
            backgroundColor: colors.themeColorOrange,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          fontSize={hp('2.8%')}
          textColor={'white'}
        />
      </View>

      {/* Following is the code for modal */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        style={{margin: 0}}
        onBackButtonPress={() => setIsVisible(false)}>
        <View style={styles.modalCont}>
          <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.countHeading}>Count</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={decreaseCount}>
                  <Text style={styles.buttonSign}>-</Text>
                </TouchableOpacity>
                <Text style={styles.count}>{count}</Text>
                <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                  <Text style={styles.buttonSign}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{alignItems:'flex-end'}}>
              <Text style={styles.totalHeading}>Total</Text>
              <View>
                <Text style={styles.amount}>$ {+count * productDetails.price}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => [navigation.navigate('PaymentScreen', {price: count * productDetails.price}), setIsVisible(false)]} buttonText={'Proceed to checkout'} style={{backgroundColor: colors.themeColorOrange, borderRadius: 10, marginTop: 55}} textColor={'white'} fontSize={hp('2.2%')} />
          </View>
        </View>
      </Modal>

      {/* Following is the code for Submitting a review modal */}
      <Modal
        isVisible={isReviewVisible}
        onBackdropPress={() => setIsReviewVisible(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        onBackButtonPress={() => setIsReviewVisible(false)}>
        <View style={styles.secModalCont}>
          <Entypo onPress={() => setIsReviewVisible(false)} name="circle-with-cross" color={'black'} size={25} style={styles.crossIcon} />
          <View style={{width: '100%'}}>
            <Text style={{fontSize: hp('4%'), fontWeight: 'bold', marginLeft: 10, marginBottom: 18}}>Give a rating</Text>
            <StarRating rating={rating} onChange={setRating} enableHalfStar={false} style={{marginTop: 10}} />
            <Input placeholder={'Do you like the product?'} value={reviewText} onChange={changedText => setReviewText(changedText)} style={{borderRadius: 12, marginVertical: 15}} />
            <View style={{width: '40%', alignSelf: 'flex-start'}}>
              <Button
                buttonText={submitLoading ? <ActivityIndicator size={25} color={'black'} /> : 'Submit'}
                style={{backgroundColor: colors.themeColorOrange, height: hp('6%'), borderRadius: 10}}
                textColor={'white'}
                onPress={submitReview}
              />
            </View>
          </View>
        </View>
        <Toast />
      </Modal>

    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {width: wp('100%'), height: hp('30%')},
  title: {color: 'black', fontSize: hp('3.2%'), fontWeight: 'bold'},
  description: {color: 'grey', width: '95%', color: 'grey', fontSize: hp('2%')},
  price: {
    color: colors.themeColorOrange,
    fontSize: hp('3'),
    fontWeight: 'bold',
  },
  label: {color: 'grey', fontSize: hp('2.2%'), fontWeight: 'bold'},
  stock: {
    color: colors.themeColorOrange,
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  heading: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  review: {
    fontSize: hp('2.1%'),
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
  },
  modalCont: {
    height: hp('30%'),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: wp('100%'),
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 15
  },
  countHeading: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: colors.themeColorOrange,
    marginBottom: 15
  },
  button: {
    backgroundColor: colors.themeColorOrange,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
  },
  count: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: hp('2.5%'),
    color: 'black',
    fontWeight: 'bold',
  },
  totalHeading: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: colors.themeColorOrange,
    marginBottom: 15,
    textAlign: 'right'
  },
  amount: {
    color: 'black',
    fontSize: hp('3.5%'),
    fontWeight: 'bold'
  },
  buttonContainer: {
    width: '85%',
    alignSelf: 'center'
  },
  secModalCont:     {
    height: hp('42%'),
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10
  },
  iconButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 50
  },
  reviewCont: {
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 28,
    marginTop: 20,
  },
  meainReviewCont: {
    width: '93%',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  crossIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1000
  }
});
