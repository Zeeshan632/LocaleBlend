import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FriendBar from '../../components/FriendBar';
import HeaderWithBackIcon from '../../components/HeaderWithBackIcon';
import axios from 'axios';
import {useSelector} from 'react-redux';
import endpoint from '../../utils/endpoint';
import Input from '../../components/Input';
import BackIcon from '../../components/BackIcon';

const Matches = ({navigation}) => {
  const [friendsList, setFriendsList] = useState([]);
  const {data, token} = useSelector(state => state.authData);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState('');

  const renderSuggestion = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleOptionPress(item.name)} style={{width: '100%', padding: 15}}>
        <Text style={{fontSize: hp('1.6%'), color: 'black'}}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const handleOptionPress = (name) => {
    setSearchText(name);
    
    let data = new FormData();
    data.append('name', name);

    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/user-search`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type':'multipart/form-data',
      },
      data : data
    };

    axios(config)
    .then((response) => {
      setSuggestions([])
      setFriendsList(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }


  const handleSearchText = (searched) => {
    setSearchText(searched);
    setFriendsList([])

    let dataToBeAppend = new FormData();
    dataToBeAppend.append('name', searched);

    if(searched.length > 0){
      let config = {
        method: 'post',
        url: `${endpoint.endpointUrl}/user-autocomplete`,
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        data : dataToBeAppend,
        
      };
      
      axios(config)
      .then((response) => {
        setSuggestions(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });      
    }else {
      setSuggestions([]);
    }


  }

  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>
        <BackIcon onBackPress={() => navigation.goBack()} />
      <View style={{width: '90%', alignSelf: 'center', marginTop: 0}}>
        <Input
          onChange={handleSearchText}
          placeholder={'Search to find users'}
          placeholderColor={'grey'}
          style={{backgroundColor: 'white', borderRadius: 8}}
          value={searchText}
          autoCapitalize={false}
          autoFocus={true}
        />
      </View>
      {/* <Text
        style={{
          color: colors.themeColorOrange,
          fontSize: wp('4%'),
          marginVertical: 15,
          marginHorizontal: 30,
        }}>
        Your search matches
      </Text> */}

      <View style={{backgroundColor: 'white', width: wp('90%'), alignSelf: 'center', borderRadius: 8, marginTop: 15}}>
        <FlatList
          keyboardShouldPersistTaps='handled'
          data={suggestions}
          renderItem={renderSuggestion}
        />
      </View>

      {/* all of the searches */}
      <View
        style={styles.peopleCont}>
        <FlatList
          keyExtractor={item => item.id}
          data={friendsList}
          renderItem={({item}) => {
            if(item.user_id === data.id){
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('UserProfile')}
                  style={{marginVertical: 10, width: wp('90%'), alignSelf: 'center'}}>
                  <FriendBar
                    // onRemovePress={onRemovePress}
                    id={item.id}
                    username={item.user_name}
                    userProfileImage={item.user_profile_image}
                    age={item.age}
                  />
                </TouchableOpacity>
              )
            }else {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('OtherUserProfile', {otherUserId: item.user_id})}
                  style={{marginVertical: 10, width: wp('90%'), alignSelf: 'center'}}>
                  <FriendBar
                    // onRemovePress={onRemovePress}
                    id={item.id}
                    username={item.user_name}
                    userProfileImage={item.user_profile_image}
                    age={item.age}
                  />
                </TouchableOpacity>
              )
            }

          }}
        />
      </View>
    </View>
  );
};

export default Matches;

const styles = StyleSheet.create({
  peopleCont: {
    width: '92%',
    height: hp('75%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden'
  }
});
