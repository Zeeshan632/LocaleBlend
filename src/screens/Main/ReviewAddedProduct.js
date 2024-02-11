import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import Header from '../../components/Header';
import Button from '../../components/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const ReviewAddedProduct = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Header inShop={true} navigation={navigation} />
        </View>

        <View style={styles.container}>
          <View style={styles.topContainer}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              color={'grey'}
              size={28}
            />
            <Text style={styles.heading}>Review your first product</Text>
          </View>
          <Text style={{color: 'grey', margin: 10}}>
            Upload product images (min 3 - max 5)
          </Text>
          <View style={styles.imagesContainer}>
            <Image style={styles.imageSelector} source={images.productImg} />
            <Image style={styles.imageSelector} source={images.productImg} />
            <Image style={styles.imageSelector} source={images.productImg} />
          </View>
          <View style={styles.inputsContainer}>
            <TextInput
              placeholder="Product name"
              placeholderTextColor={colors.themeDarkOrange}
              value={'1 Train (Broadway/ 7 Av Local) Wooden Train'}
              style={styles.input}
            />
            <TextInput
              placeholder="Category"
              placeholderTextColor={colors.themeDarkOrange}
              value={'Art Pieces'}
              style={styles.input}
            />
            <View style={styles.internalCont}>
              <TextInput
                placeholder="Price per unit"
                value={'$16.95'}
                placeholderTextColor={colors.themeDarkOrange}
                style={styles.smallInput}
              />
              <TextInput
                placeholder="Stock (quantity)"
                value={'10'}
                placeholderTextColor={colors.themeDarkOrange}
                style={styles.smallInput}
              />
            </View>
            <TextInput
              placeholder="Product Description"
              placeholderTextColor={colors.themeDarkOrange}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              textAlignVertical={'top'}
              value={
                'Train car plays on all standard wooden railway systems. One-piece hardwood body and non-toxic child-safe paints. Fun for ages 3 and older.'
              }
            />
            <View style={styles.buttonsContainer}>
              <Button
                buttonText={'Back'}
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: colors.themeColorOrange,
                  borderRadius: 10,
                  width: '48%',
                }}
                textColor={'white'}
              />
              <Button
                buttonText={'Upload'}
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: colors.themeColorOrange,
                  borderRadius: 10,
                  width: '48%',
                }}
                textColor={'white'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible} onBackButtonPress={() => setModalVisible(false)}>
        <View style={{flex: 1, backgroundColor: colors.lightPink, borderRadius: 10, justifyContent:'center', alignItems: 'center'}}>
            <Entypo onPress={() => setModalVisible(false)} name="circle-with-cross" color={colors.themeColorOrange} size={30} style={styles.crossIcon} />
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

export default ReviewAddedProduct;

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
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '98%',
    alignSelf: 'center',
    marginTop: 15,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  imageSelector: {
    backgroundColor: '#FFE9D5',
    borderRadius: 15,
    width: wp('27%'),
    height: hp('13%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIcon: {
    position: 'absolute',
    top: 15,
    right: 15
  }
});
