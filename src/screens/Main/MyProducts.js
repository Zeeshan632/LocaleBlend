import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import axios from 'axios';
import endpoint from '../../utils/endpoint';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import HeaderWithBackIcon from '../../components/HeaderWithBackIcon';
import MyProductCard from '../../components/MyProductCard';


const productsData = [
  {
    productImage:images.productImage,
    price:'2.25',
    productName: 'Bracelets & Wristbands',
    sellerName: "ANTONIO'S",
    sellersImage: images.sellersImage,
    rating:'4.8',
  },
  {
    productImage:images.productImage,
    price:'2.25',
    productName: 'Bracelets & Wristbands',
    sellerName: "ANTONIO'S",
    sellersImage: images.sellersImage,
    rating:'4.8',
  },
  {
    productImage:images.productImage,
    price:'2.25',
    productName: 'Bracelets & Wristbands',
    sellerName: "ANTONIO'S",
    sellersImage: images.sellersImage,
    rating:'4.8',
  },
];

const MyProducts = ({navigation}) => {
  const {data} = useSelector(resp => resp.authData);
  const {token} = useSelector(resp => resp.authData);

  const [activeProducts, setActiveProducts] = useState([]);
  const [inActiveProducts, setInActiveProducts] = useState([]);

  // const [buttonLoading, setLoading] = useState(false);

  const [loading, setLoading] = useState(false)

  let config = {
    method: 'get',
    url: `${endpoint.endpointUrl}/my-product/${data.id}`,
    headers: { 
      'Authorization': `Bearer ${token}` 
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyProducts()
    })

    return unsubscribe;
  }, [navigation])

  const fetchMyProducts = () => {
    setLoading(true)

    axios(config)
    .then(function (response) {
      setLoading(false)  
      const activeProd = response.data.data.filter(prod => {
        return prod.is_active
      })
      const inActiveProd = response.data.data.filter(prod => {
        return !prod.is_active
      })
      
      setActiveProducts(activeProd)
      setInActiveProducts(inActiveProd)
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error);
    });
  }
  
  const inactivate = (prodId) => {
    setLoading(true)

    let data = new FormData();
    data.append('id', prodId);
    data.append('status', '0');

    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/product-status-change`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };

    axios(config)
      .then((resp) => {
        setLoading(false)
        console.log(")))))))))))))))))))))))))))))", resp);
        fetchMyProducts()
      })
      .catch((error) => {
        setLoading(false)
        console.log(")))))))))))))))))))))))))))))errrrrrrrrr", error);
      });
  }
  const activate = (prodId) => {
    setLoading(true)
    
    let data = new FormData();
    data.append('id', prodId);
    data.append('status', '1');

    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/product-status-change`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
      data : data
    };

    axios(config)
      .then((resp) => {
        setLoading(false)
        fetchMyProducts()
      })
      .catch((error) => {
        setLoading(false)
        console.log(")))))))))))))))))))))))))))))errrrrrrrrr", error);
      });
  }
  
  const renderActiveVerticalProducts = ({item}) => {
    return (  
      <View style={{width: wp('85%'), marginVertical: 15}}>
        <MyProductCard
          productImage={item?.image1}
          price={item?.price}
          productName={item?.name}
          sellerName={"ANTONIO'S"}
          sellersImage={images.sellersImage}
          rating={'4.8'}
          myProduct={true}
          active={item?.is_active}
          onButtonPress={() => inactivate(item.id)}
        />
      </View>
    )
  }
  const renderInactiveVerticalProducts = ({item}) => {
    return (
      <View style={{width: wp('85%'), marginVertical: 15}}>
        <MyProductCard
          productImage={item?.image1}
          price={item?.price}
          productName={item?.name}
          sellerName={"ANTONIO'S"}
          sellersImage={images.sellersImage}
          rating={'4.8'}
          myProduct={true}
          active={item?.is_active}
          onButtonPress={() => activate(item.id)}
        />
      </View>
    )
  }
  


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        <HeaderWithBackIcon onBackPress={() => navigation.navigate('ProfileTab')} navigation={navigation} />
      </View>

      <View style={{width: '95%', alignSelf: 'center', marginTop: 15}}>
        <Button onPress={() => navigation.navigate('AddFirstProduct', {first: false})} buttonText={'ADD PRODUCT'} style={{backgroundColor:colors.themeColorOrange, borderRadius:10}} textColor={'white'} />
      </View>
      {
        !loading ? (
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>My Products</Text>
            {/* Active products list */}
            {
              activeProducts.length !== 0 ? (
                  <View style={[styles.topOf, {marginTop: 20, marginBottom: 10}]}>
                    <Text style={styles.smaller} >ACTIVE PRODUCTS</Text>
                  </View>
              ) : null
            }
            <FlatList 
              data={activeProducts}
              renderItem={renderActiveVerticalProducts}
              showsVerticalScrollIndicator={false}
              style={{alignSelf: 'center'}}
            />
  
            {/* In-Active products list */}
            {
              inActiveProducts.length !== 0 ? (
                  <View style={[styles.topOf, {marginTop: 40, marginBottom: 10}]}>
                    <Text style={styles.smaller} >IN-ACTIVE PRODUCTS</Text>
                  </View>
              ) : null
            }
            <FlatList 
              data={inActiveProducts}
              renderItem={renderInactiveVerticalProducts}
              showsVerticalScrollIndicator={false}
              style={{alignSelf: 'center'}}
            /> 
          </View>
          
          </ScrollView>
        ) : <ActivityIndicator size={70} color='black' style={{marginTop: hp('20%')}} />
      }

    </View>
  );
};

export default MyProducts;

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
    fontSize: hp('2.2%'),
    color:'rgba(0,0,0,0.7)',
    letterSpacing: 0.8
  },
  headingContainer: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
    padding: 15,
    // height: hp('120%')
  },
  heading: {
    color: 'black',
    fontSize: hp('3.7%'),
    fontWeight: '900',
    marginVertical: 15,
  }

});
