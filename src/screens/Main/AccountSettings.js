import {StyleSheet, Text, View, StatusBar, ActivityIndicator, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import endpoint from '../../utils/endpoint'

import Header from '../../components/Header';
import Button from '../../components/Button';
import BackIcon from '../../components/BackIcon';
import Input from '../../components/Input';
import colors from '../../theme/colors';
import images from '../../assets/images';

import { useSelector } from 'react-redux';

const AccountSettings = ({navigation}) => {
  const {token} = useSelector(state => state.authData)
  
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true)
  const [hideNewPassword, setHideNewPassword] = useState(true)
  const [hideRetypedPassword, setHideRetypedPassword] = useState(true)
  
  const [loading, setLoading]  = useState(false)
  const [showInputs, setShowInputs] = useState(false)
  const [retypedPassword, setRetypedPassword] = useState('')
  const [inputData, setInputData] = useState({
    currentPassword: "",
    newPassword: ""
  })
  let data = new FormData();
  data.append('current_password', inputData.currentPassword);
  data.append('new_password', inputData.newPassword);
  data.append('confirm_new_password', inputData.newPassword);

  let config = {
    method: 'post',
    url: `${endpoint.endpointUrl}/change-password`,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
    data : data
  };

  const onSubmitPress = () => {

    if(inputData.currentPassword && inputData.newPassword && retypedPassword){
      if(inputData.newPassword === retypedPassword){
        setLoading(true)
        axios(config)
        .then(function (response) {
          setLoading(false)
          if(response.data.success){
            navigation.navigate('Profile')
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Password updated successfully'
            })
          }else {
            Toast.show({
              type: 'error',
              text1: 'Warning',
              text2: response.data.message,
            })
          }
        })
        .catch(function (error) {
          setLoading(false)
        });
      }else {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: "Your new password and retyped password does not match"
        })
      }
      
    } else {
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: "You can't leave any field empty"
      })
    }

  }

  const onInputChange = (dataKey, changedText) => {
    setInputData(oldData => {
      return {...oldData, [dataKey]: changedText}
    })
  }
  
  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar backgroundColor={colors.lightPink} />
        <View style={{width: '95%', alignSelf:'center'}}>
          <BackIcon onBackPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.heading}>Account Settings</Text>

        {showInputs ? (
          <View style={{width: '90%', marginVertical: 15, alignSelf: 'center'}}>
            <View style={{width: '100%', marginBottom: 15}}>
              <Text style={styles.inputHeading}>Your Current Password</Text>
              <Input
                placeholder="Enter current password"
                placeholderColor="grey"
                keyboardType="default"
                value={inputData.currentPassword}
                onChange={(changedText) => onInputChange('currentPassword', changedText)}
                secureTextEntry={hideCurrentPassword}
                showPassword={() => setHideCurrentPassword(!hideCurrentPassword)}
                eyeIcon={true}
                inputFieldStyle={styles.inputField}
              />
            </View>
            <View style={{width: '100%', marginBottom: 15}}>
              <Text style={styles.inputHeading}>Your New Password</Text>
              <Input
                placeholder="Enter new password"
                placeholderColor="grey"
                keyboardType="default"
                value={inputData.newPassword}
                onChange={(changedText) => onInputChange('newPassword', changedText)}
                secureTextEntry={hideNewPassword}
                showPassword={() => setHideNewPassword(!hideNewPassword)}
                eyeIcon={true}
                inputFieldStyle={styles.inputField}
              />
            </View>
            <View style={{width: '100%'}}>
              <Text style={styles.inputHeading}>Retype New Password</Text>
              <Input
                placeholder="Retype new password"
                placeholderColor="grey"
                keyboardType="default"
                value={retypedPassword}
                onChange={(changedText) => setRetypedPassword(changedText)}
                secureTextEntry={hideRetypedPassword}
                showPassword={() => setHideRetypedPassword(!hideRetypedPassword)}
                eyeIcon={true}
                inputFieldStyle={styles.inputField}
              />
            </View>
            <View style={{width: '90%', alignSelf: 'center', marginVertical: 45}}>
              <Button
                onPress={onSubmitPress}
                buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Submit"}
                fontSize={wp('5%')}
                textColor="white"
                style={{backgroundColor: colors.themeColorOrange}}
              />
            </View>
          </View>
          ) : (
            <View style={{width: '85%', alignSelf: 'center', marginVertical: 45}}>
              <Button
                onPress={() => setShowInputs(true)}
                buttonText={"Change Password"}
                fontSize={wp('5%')}
                textColor="white"
                style={{backgroundColor: colors.themeColorOrange }}
              />
            </View>
          )
        }
      </ScrollView>
    </View>
  );
};

export default AccountSettings;

const styles = StyleSheet.create({
  heading: {
    fontSize: wp('8%'),
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 25
  },
  inputHeading: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: colors.themeColorOrange,
    margin: 10,
    marginTop: 15
  },
  inputField: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  }
});
