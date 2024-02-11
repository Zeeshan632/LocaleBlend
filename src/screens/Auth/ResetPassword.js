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
  import endpoint from '../../utils/endpoint';
  
  import Toast from 'react-native-toast-message'
  import axios from 'axios';
  
  import colors from '../../theme/colors';
  import Button from '../../components/Button';
  import Input from '../../components/Input';
  
  const ResetPassword = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [hideResetPassword, setHideResetPassword] = useState(true)
    const [inputData, setInputData] = useState({
      password: ""
    })
    const [retypePassword, setRetypePassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {id} = route.params
  
    let data = new FormData();
    data.append('id', id)
    data.append('password', inputData.password);
  
    var config = {
        method: 'post',
        url: `${endpoint.endpointUrl}/update-forget-password`,
        headers: { 
            'Content-Type': 'multipart/form-data'
        },
        data : data
    };
    
    const onInputChange = (dataKey, changedText) => {
      setInputData(oldData => {
        return {...oldData, [dataKey]: changedText}
      })
    }

    const validatePassword = (password) => {
      if(password.length >= 8){
        return true
      }else {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: "Passowrd's length must be greater than eight characters"
        })
      }
    }
    
    const onResetPress = () => {
      if(validatePassword(inputData.password)){
        if(inputData.password === retypePassword){
            setLoading(true)
            axios(config)
                .then(function (response) {
                    setLoading(false)
                    if(response.data.success){
                        navigation.navigate('Login')
                        Toast.show({
                            type: 'success',
                            text1: 'Success',
                            text2: response.data.message
                        })
                    }else {
                      Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: response.data.message
                      })
                    }
                })
                .catch(function (error) {
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
                text2: "Password and retyped password does not match"
            })
        }
      }
    }
    
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Text style={styles.topText}>Reset Password</Text>
          <View style={{width: '90%', marginVertical: 15}}>
            <View style={{width: '100%', marginBottom: 15}}>
              <Input
                placeholder="Enter new password"
                placeholderColor="grey"
                keyboardType="default"
                secureTextEntry={hidePassword}
                value={inputData.password}
                eyeIcon={true}
                onChange={(changedText) => onInputChange('password', changedText)}
                showPassword={() => setHidePassword(!hidePassword)}
              />
            </View>
            <View style={{width: '100%'}}>
              <Input
                placeholder="Rewrite the password"
                placeholderColor="grey"
                keyboardType="default"
                secureTextEntry={hideResetPassword}
                value={retypePassword}
                eyeIcon={true}
                onChange={(changedText) => setRetypePassword(changedText)}
                showPassword={() => setHideResetPassword(!hideResetPassword)}
              />
            </View>
          </View>
  
          <View style={{width: '90%', marginTop: 15, marginBottom: 30}}>
            <Button
              onPress={onResetPress}
              disabled={loading}
              buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Reset"}
              textColor="white"
              fontSize={wp('4.5%')}
              style={{backgroundColor: colors.themeColorOrange}}
            />
          </View>
  
        </ScrollView>
      </View>
    );
  };
  
  export default ResetPassword;
  
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
  