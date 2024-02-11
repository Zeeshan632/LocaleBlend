import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../../components/Header';
import ShopCard from '../../components/ShopCard';
import Button from '../../components/Button';
import HeaderWithBackIcon from '../../components/HeaderWithBackIcon';
import axios from 'axios';
import {useSelector} from 'react-redux';
import endpoint from '../../utils/endpoint';
import ShopHeader from '../../components/ShopHeader';

const Feed = ({navigation}) => {
  // const {data} = useSelector(state => state.authData)
  const {seller, token} = useSelector(state => state.authData);
  const [shopsData, setShopsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchShops();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchShops = () => {
    setLoading(true);
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/all-shop/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(response => {
        setLoading(false);
        if (response.data.success) {
          setShopsData(response.data);
        } else {
          console.log('Some Error Occured while fetching data of shops');
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const renderVerticalProducts = ({item}) => {
    return (
      <View style={{width: wp('85%'), marginVertical: 12, alignSelf: 'center'}}>
        <ShopCard
          shopId={item.id}
          imagePath={shopsData.file_path}
          productImage={item.image}
          shopName={item.name}
          sellerName={item.user_name}
          sellersImage={item.user_profile_image}
          rating={item.rating}
          navigation={navigation}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>
      <StatusBar backgroundColor={colors.lightPink} barStyle={'dark-content'} />

      <FlatList
        ListHeaderComponent={() => (
          <View>
            <ShopHeader
              onBackPress={() => navigation.goBack()}
              inShop={true}
              navigation={navigation}
            />

            <View style={{width: '95%', alignSelf: 'center', marginTop: 15}}>
              <Button
                onPress={() =>
                  seller
                    ? navigation.navigate('MyProducts')
                    : navigation.navigate('SetupYourShop')
                }
                buttonText={seller ? 'SWITCH TO SELLER' : 'BECOME A SELLER'}
                style={{
                  backgroundColor: colors.themeColorOrange,
                  borderRadius: 10,
                }}
                textColor={'white'}
              />
            </View>

            <Text style={styles.heading}>Shop Products On{`\n`}The Sub</Text>

            <View style={[styles.topOf, {marginTop: 10, marginBottom: 10}]}>
              <Text style={styles.smaller}>NEARBY SHOPS</Text>
            </View>

            {loading ? <ActivityIndicator style={{marginTop: 100}} size={75} color='black' /> : shopsData.length <= 0 ? <Text style={{width: '80%', fontSize: hp('3%')}}>You don't have any shops nearby</Text> : null}
          </View>
        )}
        data={shopsData.data}
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
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 12,
    marginBottom: 20,
  },
  smaller: {
    fontSize: hp('3.2%'),
    color: 'rgba(0,0,0,0.7)',
    letterSpacing: 0.9,
    fontWeight: 'bold',
  },
  internalCont: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'center',
    padding: 15,
  },
  heading: {
    color: 'black',
    fontSize: hp('3.7%'),
    fontWeight: '900',
    marginVertical: 15,
    alignSelf: 'center',
    width: '90%',
  },
});
