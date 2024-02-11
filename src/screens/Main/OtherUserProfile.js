import { StyleSheet, Text, View, Image, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, {useState, useCallback, useEffect} from 'react'
import images from '../../assets/images'
import colors from '../../theme/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Post from '../../components/Post'
import Header from '../../components/Header'
import { useSelector } from 'react-redux';
import axios from 'axios';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

import ProfileBanner from '../../components/ProfileBanner';
import Button from '../../components/Button';

import endpoint from '../../utils/endpoint';




const OtherUserProfile = ({navigation, route}) => {
  const {data} = useSelector(state => state.authData)
  const {token} = useSelector(state => state.authData)
  const {otherUserId} = route.params;

  const [postsData, setPostsData] = useState([]);
  const [userData, setUserData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);


  let config = {
    method: 'get',
    url: `${endpoint.endpointUrl}/post/${otherUserId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  let userDataConfig = {
    method: 'get',
    url: `${endpoint.endpointUrl}/user/${otherUserId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true)

    axios(config)
    .then((response) => {
      setPostsData(response?.data?.data)
      setLoading(false)
      setRefreshing(false)
    })
    .catch((error) => {
      setLoading(false)
      setRefreshing(false)
    });
    
  }, []);

  useEffect(() => {
    setLoading(true)

    axios(config)
      .then((response) => {
        setLoading(false)
        setPostsData(response?.data?.data)
      })
      .catch((error) => {
        setLoading(false)
      });

    axios(userDataConfig)
      .then((response) => {
        setLoading(false)
        setUserData(response?.data?.data)
      })
      .catch((error) => {
        setLoading(false)
      });
  }, [])

  const renderPosts = ({item}) => {
    return (
      <View style={{marginVertical: 20, width: '90%', alignSelf: 'center'}}>
        <Post
          navigation={navigation}
          postId={item?.id}
          userAvatar={item?.user_profile_image}
          username={item?.user_name}
          time={item?.created_at}
          postText={item?.text}
          nOfReactions={item?.totalreactions}
          nOfComments={item?.totalcomments}
          postImage={item?.image}
          postVideo={item?.video}
          thumbnail={item?.thumbnail}
          react={item?.react}
          onProfilePress={() => navigation.navigate('OtherUserProfile')}
        />
      </View>
    )
  }

  const startChat = () => {
    // console.log("===============>>>>>>", data.id, "other user id", otherUserId)
    // firestore().collection('chats').doc(`${data.id}_${otherUserId}`)
    navigation.navigate('ChatScreen', {otherUserId, userData, navigatedFrom: 'profile'})
  }
  
  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>

      {!loading ? (

      <FlatList
        ListHeaderComponent={() => (
          <View style={{width: '95%', alignSelf: 'center'}}>                        
            <View>
              <HeaderWithoutSearch navigation={navigation} />
            </View>
            <View style={{margin: 10}}>
                <ProfileBanner image={userData.user_profile_image} username={userData.user_name ? userData.user_name : "Not Found"} email={userData.user_email ? userData.user_email : "Not Found"} />
                <Button onPress={startChat} buttonText={"Chat"} textColor={'white'} style={{backgroundColor: colors.themeColorOrange, marginTop: 20}} />
            </View>
            

            <Text style={[styles.headingText, {marginLeft: 15, marginTop: 25}]}>Your Posts</Text>
            {postsData.length <= 0 ? <Text style={styles.emptyText}>User don't have any posts yet</Text> : null}
          </View>
        )}
      
        data={postsData}
        renderItem={renderPosts}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      ) : <ActivityIndicator color={'black'} size={50} style={{alignSelf: 'center', marginVertical: 100}} />}
 
    </View>
  )
}

export default OtherUserProfile

const styles = StyleSheet.create({
  horizontalScroll: {
    width: '100%',
    alignSelf: 'center',
    // backgroundColor: colors.lightPink,
    borderRadius: 25,
    overflow: 'hidden',

  },
  postsContainer: {
    width: '100%',
    backgroundColor: colors.lightPink,
    borderRadius: 25,
    marginTop: 25,
    alignSelf: 'center',
    padding: 15,
  },
  headingText: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
  upperHeadingText: {
    color: 'black',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: -16
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 250,
    resizeMode: 'cover',
    borderColor: 'black',
  },
  emptyText: {
    fontSize: hp('2.5%'),
    alignSelf: 'center',
    marginVertical: 30,
    color: 'grey'
  },
})

