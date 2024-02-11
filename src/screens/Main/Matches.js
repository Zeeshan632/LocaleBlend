import { StyleSheet, Text, View, Image, ScrollView, FlatList, StatusBar, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import colors from '../../theme/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FriendBar from '../../components/FriendBar';
import HeaderWithBackIcon from '../../components/HeaderWithBackIcon';
import axios from 'axios';
import { useSelector } from 'react-redux';
import endpoint from '../../utils/endpoint';

const Matches = ({navigation}) => {
  const [friendsList, setFriendsList] = useState([])
  const {data, token} = useSelector(state => state.authData)
  const [searchText, setSearchText] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchFriends = () => {
    setLoading(true)
    
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/all-friend`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
    };
    
    axios(config)
    .then((response) => {
      setLoading(false)
      setFriendsList(response.data.data)
      setFilteredUsers(response.data.data)
    })
    .catch((error) => {
      setLoading(false)
      console.log("Some Error Occured", error)
    });
  }

  const onRemovePress = (id) => {
    setLoading(true)
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/remove-friend/${id}`,
      headers: { 
        'Authorization': `Bearer ${token}`, 
      }
    };
    
    axios(config)
    .then((response) => {
      setLoading(false)
      const afterRemoval = filteredUsers.filter(user => id !== user.id);
      setFilteredUsers(afterRemoval);
    })
    .catch((error) => {
      setLoading(false)
      console.log("======>>>>>>", error);
    });
  }


  const renderFriend = ({item}) => {
    return (
      <View style={{marginVertical: 10, width: '90%', alignSelf: 'center'}}>
        <FriendBar onRemovePress={onRemovePress} id={item.id} username={item.user_name} userProfileImage={item.user_profile_image} age={item.age} />
      </View>
    ) 
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFriends()
    })
    return unsubscribe;
  }, [navigation])

  const searchFilter = (searchTerm) => {

    const filtered = friendsList.filter(user => {
      return (
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase())      
      );
    });
    setFilteredUsers(filtered);

  };

  const handleSearchInput = (changedText) => {
    setSearchText(changedText)
    searchFilter(changedText)
  }
  
  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>
        <HeaderWithBackIcon searchText={searchText} setSearchText={handleSearchInput} placeholder={'Search for matches'} navigation={navigation} onBackPress={() => navigation.goBack()} />
        <View style={{height: hp('88%'), overflow: 'hidden'}}>
          {
            filteredUsers.length > 0 ? (
              <FlatList
                ListHeaderComponent={() => (
                  <>
                    <Text style={{color: 'black', fontSize: wp('6%'),fontWeight: 'bold',marginVertical: 15, marginHorizontal: 20}}>Your Matches</Text>
                  </>
                )}
                keyExtractor={item => item.id}
                data={filteredUsers}
                renderItem={renderFriend}
              />
            ) : loading ? <ActivityIndicator color={'black'} size={50} style={{marginTop: 120}} /> : <Text style={styles.warning}>You don't have any matches right now</Text>
          }

        </View>

    </View>
  )
}

export default Matches

const styles = StyleSheet.create({
  warning: {
    fontSize: hp('2.3%'),
    alignSelf:'center',
    marginTop: 50
  }
})