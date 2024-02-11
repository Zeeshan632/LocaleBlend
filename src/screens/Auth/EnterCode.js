import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React, {useState} from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import axios from 'axios';
  
  import Toast from 'react-native-toast-message';
  import OTPInputView from '@twotalltotems/react-native-otp-input';
  
  import images from '../../assets/images';
  import colors from '../../theme/colors';
  import Button from '../../components/Button';
  import Input from '../../components/Input';
import endpoint from '../../utils/endpoint';
  
  const EnterCode = ({navigation, route}) => {
    // const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false);
    const {id} = route.params;
  
    const onSubmitPress = (code) => {
      let data = new FormData();
      data.append('id', id);
      data.append('code', code);
    
      let config = {
        method: 'post',
        url: `${endpoint.endpointUrl}/check-forget-password-code`,
        headers: { 
            'Content-Type': 'multipart/form-data'
        },
        data: data,
      };  
      
      if (code.length === 4) {
        setLoading(true);
        axios(config)
          .then(function (response) {
            setLoading(false);
            if (response.data.success) {
              navigation.navigate('ResetPassword', {id});
            } else {
              Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: "Sorry the code wasn't correct",
              });
            }
          })
          .catch(function (error) {
            setLoading(false);
          });
      }
    };
  
    if(loading){
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.themeDarkBrown} size={70} />
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.topText}>Enter the code sent to your email</Text>
        <View style={{width: '80%', height: 100, alignSelf:'center'}}>
          <OTPInputView
            pinCount={4}
            placeholderCharacter="0"
            codeInputFieldStyle={{borderColor: "grey", color: "grey", borderWidth: 3, borderRadius: 8}}
            codeInputHighlightStyle={{borderColor: "lightblue", borderWidth: 4, color: 'black' }}        
            autoFocusOnLoad={false}
            onCodeFilled={(code) => onSubmitPress(code)}
          />
        </View>
        
        {/* <View style={{width: '90%', marginTop: 15, marginBottom: 30, alignSelf: 'center'}}>
          <Button
            onPress={onSubmitPress}
            disabled={loading}
            buttonText={loading ? <ActivityIndicator size={'large'} color="white" /> : "Submit"}
            textColor="white"
            fontSize={wp('4.5%')}
            style={{backgroundColor: colors.themeDarkBrown}}
          />
        </View> */}
        
      </View>
    );
  };
  
  export default EnterCode;
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    topText: {
      fontSize: wp('8%'),
      width: '75%',
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'flex-start',
      marginLeft: '5%',
      marginBottom: 30,
      marginTop: -50,
    },
    loaderContainer: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems :'center'
    }
    
  });
  