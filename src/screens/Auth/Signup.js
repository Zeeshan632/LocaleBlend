import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator

} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message'

import images from '../../assets/images';
import colors from '../../theme/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import axios from 'axios';
import endpoint from '../../utils/endpoint';
import firestore from '@react-native-firebase/firestore';

const Signup = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [hideRetypePassword, setHideRetypePassword] = useState(true)
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    password: ''
  })
  const [retypePassword, setRetypePassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onInputChange = (dataKey, changedText) => {
    setInputData(oldData => {
      return {...oldData, [dataKey]: changedText}
    })
  }

  let data = new FormData();
  data.append('first_name', inputData.firstName);
  data.append('last_name', inputData.lastName);
  data.append('email', inputData.email);
  data.append('age', inputData.age);
  data.append('password', inputData.password);

  let config = {
    method: 'post',
    url: `${endpoint.endpointUrl}/register`,
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
      }else {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: "Please enter a valid email"
        })
      }
  };
  const validatePassword = (password) => {
    if(password.length >= 8){
      return true
    }else {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "Passowrd's length should be greater than eight characters"
      })
    }
  }

  const onSignupPress = () => {
    
    if(inputData.firstName && inputData.lastName && inputData.email && inputData.age && inputData.password ){
      if(validateEmail(inputData.email)){
        if(validatePassword(inputData.password)){
          if(inputData.password === retypePassword){
            setLoading(true)
            axios(config)
            .then(function (response) {              
              
              setLoading(false)
              if(response.data.success){
                firestore()
                .collection('users')
                .doc(`${response.data.user_id}`)
                .set({
                  name: `${inputData.firstName} ${inputData.lastName}`,
                  profileImage: null,
                  id: response.data.user_id,
                })
                .then(() => {
                  setLoading(false);
                  navigation.navigate('Login');
                })
                .catch((err) => setLoading(false));

              }else {
                Toast.show({
                  type: 'error',
                  text1: 'Warning',
                  text2: response.data.message
                })
              }
            }).catch(function(error){
              setLoading(false)
              Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: error.message
              })
            })
          }else {
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: 'The retyped password does not match'
            });
          }
        }
      }

    } else {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "You can't leave any field empty"
      });
    }
    
    
  }
  
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Text style={styles.topText}>Sign up for an account</Text>

        {/* All Inputs Container */}
        <View style={{width: '90%', marginVertical: 15}}>
          <View style={{width: '100%', marginBottom: 15}}>
            <Input
              placeholder="first name"
              placeholderColor="grey"
              keyboardType="default"
              value={inputData.firstName}
              onChange={(changedText) => onInputChange('firstName', changedText) }
            />
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Input
              placeholder="last name"
              placeholderColor="grey"
              keyboardType="default"
              value={inputData.lastName}
              onChange={(changedText) => onInputChange('lastName', changedText) }
            />
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Input
              placeholder="email address"
              placeholderColor="grey"
              keyboardType="email-address"
              value={inputData.email}
              autoCapitalize="none"
              onChange={(changedText) => onInputChange('email', changedText) }
            />
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Input
              placeholder="Age"
              placeholderColor="grey"
              keyboardType="number-pad"
              value={inputData.age}
              autoCapitalize="none"
              onChange={(changedText) => onInputChange('age', changedText) }
            />
          </View>
          <View style={{width: '100%', marginBottom: 15}}>
            <Input
              placeholder="password"
              placeholderColor="grey"
              secureTextEntry={hidePassword}
              value={inputData.password}
              onChange={(changedText) => onInputChange('password', changedText)}
              eyeIcon={true}
              showPassword={() => setHidePassword(!hidePassword)}
            />
          </View>
          <View style={{width: '100%'}}>
            <Input
              placeholder="re-type password"
              placeholderColor="grey"
              secureTextEntry={hideRetypePassword}
              value={retypePassword}
              onChange={(changedText => setRetypePassword(changedText))}
              eyeIcon={true}
              showPassword={() => setHideRetypePassword(!hideRetypePassword)}
            />
          </View>
        </View>

        <View style={{width: '90%', marginVertical: 15}}>
          <Button
            onPress={onSignupPress}
            disabled={loading}
            buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Create Account"}
            textColor="white"
            fontSize={wp('4.5%')}
            style={{backgroundColor: colors.themeColorOrange}}
          />
        </View>
        <View style={{width: '90%'}}>
          <Button
            onPress={() => navigation.goBack()}
            buttonText="Back"
            textColor="white"
            fontSize={wp('4.5%')}
            style={{backgroundColor: colors.themeColorBlack}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

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
});
