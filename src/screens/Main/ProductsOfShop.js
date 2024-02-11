import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ShopCard from '../../components/ShopCard';
import HeaderWithBackIcon from '../../components/HeaderWithBackIcon';
import axios from 'axios';
import endpoint from '../../utils/endpoint';
import ProductCard from '../../components/ProductCard';
import ShopHeader from '../../components/ShopHeader';

import { useSelector } from 'react-redux';
import { addProduct } from '../../redux/CartSlice';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';


const Feed = ({navigation, route}) => {
  const {data} = useSelector(state => state.authData)
  const {seller, token} = useSelector(state => state.authData)
  const [productsData, setProductsData ] = useState([])
  const [loading, setLoading] = useState(false)
  const {shopId, shopName, imagePath, productImage, sellerName, sellersImage} = route.params;
  const dispatch = useDispatch()


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProductsOfShop()
    })

    return unsubscribe;
  }, [navigation])


  const fetchProductsOfShop = () => {
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/my-shop-products/${shopId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios(config)
      .then( (response) => {
        if(response.data.success){
          setProductsData(response.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const renderVerticalProducts = ({item}) => {
    return (
      <View style={{width: wp('92%'), marginVertical: 12, alignSelf: 'center'}}>
        <ProductCard
          productImage={item.image1}
          productName={item.name}
          price={item.price}
          rating={item.reviews_average}
          sellerName={sellerName}
          sellersImage={sellersImage}
          active={item.is_active}
          onViewPress={() => navigation.navigate('ProductDetails', {productId: item.id})}
          // addToCartPress={() => dispatch(addProduct({productImage: item.image1, productName: item.name, productPrice: item.price}))}
        />
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>

            <FlatList 
              ListHeaderComponent={() => (
                <View style={{width: '100%', alignSelf:'center'}}>
                  <ShopHeader
                    onBackPress={() => navigation.goBack()}
                    inShop={true}
                    navigation={navigation}
                  />
                  <View style={styles.internalCont}>
                      <FastImage source={{uri: `${imagePath}/${productImage}`}} style={{width: '100%', height: '100%'}} />
                      <Text style={styles.heading}>{shopName}</Text>
                  </View>
                </View>
              )}
                data={productsData.data}
                renderItem={renderVerticalProducts}
                showsVerticalScrollIndicator={false}
            />
        
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  topOf: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width:'96%',
    alignSelf:'center',
    marginVertical: 12,
    marginBottom: 20
  },
  smaller: {
    fontSize: hp('3.2%'),
    color:'rgba(0,0,0,0.7)',
    letterSpacing: 0.9,
    fontWeight: 'bold'
  },
  internalCont: {width: '92%', height: hp('25%'), borderRadius: 20, overflow: 'hidden', alignSelf:'center'},
  heading: {
    color: 'black',
    fontSize: hp('3.7%'),
    fontWeight: '900',
    marginVertical: 15,
    marginLeft: 10,
    position: 'absolute',
    bottom: 0
}
});
