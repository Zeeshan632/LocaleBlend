import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux';
import { login} from '../../redux/AuthSlice';
import Toast from 'react-native-toast-message'

import images from '../../assets/images';
import colors from '../../theme/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import endpoint from '../../utils/endpoint';


const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [inputData, setInputData] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch();
  const {loading, success, data} = useSelector(data => data.authData)


  let dataToBeAppend = new FormData();
  dataToBeAppend.append('email', inputData.email);
  dataToBeAppend.append('password', inputData.password);

  var config = {
    method: 'post',
    url: `${endpoint.endpointUrl}/login`,
    headers: { 
      'Content-Type': 'multipart/form-data'
    },
    data : dataToBeAppend
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
  const onInputChange = (dataKey, changedText) => {
    setInputData(oldData => {
      return {...oldData, [dataKey]: changedText}
    })
  }
  const onLoginPress = () => {
    
    if(inputData.email && inputData.password){
      if(validateEmail(inputData.email)){
        if(validatePassword(inputData.password)){
            dispatch(login(config))
        }
      }
    }else {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "You can't leave any field empty"
      })
    }
  }
  
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Image source={images.logoSm} />
        <Text style={styles.topText}>Login to your existing account</Text>
        <View style={{width: '90%', marginVertical: 15}}>
          <View style={{width: '100%', marginBottom: 15}}>
            <Input
              placeholder="Email"
              placeholderColor="grey"
              keyboardType="email-address"
              value={inputData.email}
              onChange={(changedText) => onInputChange('email', changedText)}
              autoCapitalize={false}
            />
          </View>
          <View style={{width: '100%'}}>
            <Input
              placeholder="Password"
              placeholderColor="grey"
              secureTextEntry={hidePassword}
              value={inputData.password}
              eyeIcon={true}
              onChange={(changedText) => onInputChange('password', changedText)}
              showPassword={() => setHidePassword(!hidePassword)}
              autoCapitalize={false}
            />
          </View>
        </View>
        <TouchableOpacity style={{width: '90%'}} onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.linkText}>forgot password?</Text>
        </TouchableOpacity>

        <View style={{width: '90%', marginTop: 15, marginBottom: 30}}>
          <Button
            onPress={onLoginPress}
            disabled={loading}
            buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Login"}
            textColor="white"
            fontSize={wp('4.5%')}
            style={{backgroundColor: colors.themeColorOrange}}
          />
        </View>

        {/* bottom Container */}
        <View style={styles.bottomContainer}>
          <View style={{width: '40%'}}>
            <Text style={styles.bottomText}>Don't have an account?</Text>
          </View>
          <View style={{width: '50%', marginLeft: 20}}>
            <Button
              onPress={() => navigation.navigate('Signup')}
              buttonText="Create account"
              textColor="white"
              fontSize={wp('4.5%')}
              style={{backgroundColor: colors.themeColorBlack}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

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
    color: colors.themeColorOrange,
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
