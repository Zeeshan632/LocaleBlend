import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../theme/colors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ShopHeader from '../../components/ShopHeader';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';


const PaymentScreen = ({route, navigation}) => {
  const {price} = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    holderName: '',
    expDate: '',
    cvv: '',
  });

  const storeData = async (value) => {
    try {
      const cardsToBeStored = [...cards, value]
      const jsonValue = JSON.stringify(cardsToBeStored)
      await AsyncStorage.setItem('@Cards', jsonValue)

    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    getData()
  }, [])
  
  const getData = async () => {
    setCards([])
    try {
      const jsonValue = await AsyncStorage.getItem('@Cards')
      return jsonValue != null ? setCards([...JSON.parse(jsonValue)]) : console.log("There are no cards added");
    } catch(e) {
      console.log(e)
    }
  }

  const deleteCard = async(cardNumber) => {
    const filteredCards = cards.filter(card => card.cardNumber !== cardNumber);
    try {
      const jsonValue = JSON.stringify(filteredCards)
      await AsyncStorage.setItem('@Cards', jsonValue)
      setCards(filteredCards)
      setSelectedCard(false)
      
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: colors.lightPink}}>
        <ShopHeader
            navigation={navigation}
            onBackPress={() => navigation.goBack()}
            inShop={false}
        />
        <Text style={{fontSize: hp('3.5%'), color: 'black', alignSelf: 'center', fontWeight: 'bold', marginVertical: hp('5%')}}>Choose a Card</Text>
          {
            cards.map(eachCard => (
              <TouchableOpacity onPress={() => setSelectedCard(eachCard)} style={[styles.cardCont, selectedCard === eachCard ? {borderColor: 'green'} : null]}>
                <AntDesign name='closecircle' size={20} color={'black'} style={styles.crossIcon2} onPress={() => deleteCard(eachCard.cardNumber) } />
                {selectedCard === eachCard ? <AntDesign name='checkcircle' size={25} color={'green'} style={styles.checkIcon} /> : null}
                <Text style={styles.cardNumber}>**** **** **** {eachCard.cardNumber.slice(-4)}</Text>
                <Text style={styles.expDate}>{eachCard.expDate}</Text>
              </TouchableOpacity>
            ))
          }

        <View style={{width: '85%', alignSelf: 'center', marginTop: 25}}>
            <Button
                buttonText={'+ Add Card'}
                style={{
                    borderWidth: 3,
                    borderColor: colors.themeColorOrange,
                    borderRadius: 10,
                }}
                textColor={colors.themeColorOrange}
                fontSize={hp('2.4%')}
                onPress={() => setIsVisible(true)}
            />
        </View>
        {
          !selectedCard ? null : (
            <View style={{width: '85%', alignSelf: 'center', marginTop: 25}}>
              <Button
                  buttonText={'Pay'}
                  style={{
                      backgroundColor: colors.themeColorOrange,
                      borderRadius: 10,
                  }}
                  textColor={'white'}
                  fontSize={hp('2.4%')}
                  // onPress={() => setIsVisible(true)}
              />
            </View>
          )
        }


        {/* Following is the code for modal */}
        <Modal
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onBackButtonPress={() => setIsVisible(false)}>
          <View style={styles.modalCont}>
            <AntDesign name='closecircle' size={20} color={'black'} style={styles.crossIcon} onPress={() => setIsVisible(false) } />
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: 'space-between', justifyContent: 'space-around'}}>
                <Input placeholder={'Card Number'} value={cardData.cardNumber} onChange={(changedText) => setCardData({...cardData, 'cardNumber': changedText })} />
                <Input placeholder={'Holder Name'} value={cardData.holderName} style={{marginVertical: 15}} onChange={(changedText) => setCardData({...cardData, 'holderName': changedText })} />
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >
                  <Input placeholder={'MM/YY'} style={{width: wp('35%')}} value={cardData.expDate} onChange={(changedText) => setCardData({...cardData, 'expDate': changedText })}/>
                  <Input placeholder={'CVV'} style={{width: wp('35%')}} value={cardData.cvv} onChange={(changedText) => setCardData({...cardData, 'cvv': changedText })}/>
                </View>
            </View>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Button onPress={() => {
                storeData(cardData)
                setCards([...cards, cardData])
                setIsVisible(false)
              }} buttonText={'ADD'} fontSize={hp('2.1%')} style={{backgroundColor: colors.themeColorOrange, marginTop: 20}} />
            </View>
          </View>
        </Modal>
    </ScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
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
    height: hp('45%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    paddingTop: 45
  },
  cardCont: {
    width: wp('85%'),
    alignSelf:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor:'grey',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8
  },
  cardNumber:{
    fontSize: hp('2.6%')
  },
  expDate: {
    fontSize: hp('2.6%')
  },
  checkIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  crossIcon: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  crossIcon2: {
    position: 'absolute',
    top: -8,
    left: -8
  }
});
