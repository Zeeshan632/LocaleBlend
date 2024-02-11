import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import images from '../assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../theme/colors';
import Entype from 'react-native-vector-icons/Entypo';
import Button from '../components/Button';
import FastImage from 'react-native-fast-image';

const ProductCard = ({
  productImage,
  productName,
  price,
  sellersImage,
  sellerName,
  rating,
  myProduct = false,
  active = false,
  onViewPress,
}) => {

  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/product/${productImage}`,
        }}
        style={styles.image}
      />
      <View style={styles.topContainer}>
        <Text style={styles.heading}>{productName}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Text style={styles.sold}>SOLD BY</Text>
      <View style={styles.reviewContainer}>
        <View style={styles.nameContainer}>
          <FastImage
            source={{
              uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${sellersImage}`,
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 15,
            }}
          />
          <Text style={styles.name}>
            {sellerName}
            {`\n`}SUB-SHOP
          </Text>
        </View>
        <View style={styles.reviewCont}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entype name="star" size={20} color={colors.themeColorOrange} />
            <Text style={styles.name}>{rating}</Text>
          </View>
          <Text style={styles.name}>REVIEW</Text>
        </View>
      </View>

      {myProduct ? (
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Button
            buttonText={active ? 'IN-ACTIVE' : 'ACTIVE'}
            style={{backgroundColor: colors.themeColorOrange, borderRadius: 15}}
            textColor={'white'}
          />
        </View>
      ) : (
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Button
            buttonText={'View Product'}
            style={{backgroundColor: colors.themeColorOrange, borderRadius: 15}}
            textColor={'white'}
            onPress={onViewPress}
          />
        </View>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: hp('56%'),
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 20,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: hp('25%'),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    alignSelf: 'center',
    marginTop: 10,
  },
  heading: {
    fontSize: hp('3.7%'),
    width: '60%',
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: hp('3.5%'),
    width: '60%',
    fontWeight: '900',
    color: colors.themeColorOrange,
    textAlign: 'right',
    width: '40%',
  },
  sold: {
    color: 'black',
    width: '92%',
    alignSelf: 'center',
    fontWeight: 'bold',
    lineHeight: 40,
    letterSpacing: 4,
    marginTop: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    width: '92%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: hp('1.8%'),
    marginLeft: 10,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  reviewCont: {
    alignItems: 'flex-end',
  },
});
