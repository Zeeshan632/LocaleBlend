import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import axios from 'axios';
  import endpoint from '../../utils/endpoint';
  import Toast from 'react-native-toast-message'
  
  import images from '../../assets/images';
  import colors from '../../theme/colors';
  import Button from '../../components/Button';
  import Input from '../../components/Input';
  
  const ForgetPassword = ({navigation}) => {
    const [inputData, setInputData] = useState({ email: "" })
    const [loading, setLoading] = useState(false)
  
  
    let data = new FormData();
    data.append('email', inputData.email);
  
    var config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/forget-password-email`,
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      data : data
    };
    const validateEmail = (email) => {
      if(email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
          return true
        }
    };
    
    const onInputChange = (dataKey, changedText) => {
      setInputData(oldData => {
        return {...oldData, [dataKey]: changedText}
      })
    }
    const onSubmitPress = () => {
      
      if(validateEmail(inputData.email)){
        setLoading(true)
        axios(config)
          .then((response) => {
            if(response.data.success){
              navigation.navigate('EnterCode', {id: response.data.data.id})
            }else {
              Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: response.message
              })
            }
            setLoading(false)
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
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: "Please enter a valid email"
        })
      }
    }
    
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.topText}>Enter your email</Text>
  
          <View style={{width: '90%', marginVertical: 15}}>
            <View style={{width: '100%', marginBottom: 15}}>
              <Input
                placeholder="Write a registered email"
                placeholderColor="grey"
                keyboardType="email-address"
                value={inputData.email}
                onChange={(changedText) => onInputChange('email', changedText)}
              />
            </View> 
          </View>
  
          <View style={{width: '90%', marginTop: 15, marginBottom: 30}}>
            <Button
              onPress={onSubmitPress}
              disabled={loading}
              buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Submit"}
              textColor="white"
              fontSize={wp('4.5%')}
              style={{backgroundColor: colors.themeColorOrange}}
            />
          </View>
  
        </ScrollView>
      </View>
    );
  };
  
  export default ForgetPassword;
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    topText: {
      fontSize: wp('8%'),
      width: '60%',
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'flex-start',
      marginLeft: '5%',
      marginVertical: 30,
    },
    linkText: {
      alignSelf: 'flex-end',
      color: colors.themeLightBrown,
      fontSize: wp('4%'),
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginVertical: 35,
    },
    bottomText: {
      fontSize: wp('6%'),
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'flex-start',
      marginLeft: '5%',
    },
  });
  