import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList, StatusBar, ActivityIndicator, RefreshControl, TouchableWithoutFeedback} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Post from '../../components/Post';
import Header from '../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import endpoint from '../../utils/endpoint';
import axios from 'axios';
import UserCard from '../../components/UserCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Feed = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('feed')
  const {data, seller, blockedPosts, token} = useSelector(state => state.authData)
  const {addedProducts} = useSelector(state => state.cartData)
  const [users, setUsers] = useState([])
  const [usersOffset, setUsersOffset] = useState(1)
  const [swiped, setSwiped] = useState([])
  const [scrolled, setScrolled] = useState(false)

  const [postsData, setPostsData] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [retrievalLoading, setRetrievalLoading] = useState(false);


  const fetchUsers = () => {
    setOffset(1)
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${endpoint.endpointUrl}/all-user/1`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      const dataValues = Object.values(response?.data?.data)
      setUsers(dataValues)
    })
    .catch(function (error) {
      console.log("Error in fetching users for swipe ", error);
    });
  }

  const fetchMoreUsers = (offset) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${endpoint.endpointUrl}/all-user/${offset}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      const dataValues = Object.values(response?.data?.data)
      setUsers(oldUsers => [...dataValues, ...oldUsers])
    })
    .catch(function (error) {
      console.log("Error in fetching users for swipe ", error);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setOffset(2)
    setHasMore(true)
  
    const config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/all-post/1`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios(config)
    .then((response) => {
      setRefreshing(false)
      const dataValues = Object.values(response?.data?.data)
      setPostsData(dataValues)
  
    })
    .catch((error) => {
      console.log("errorororoorororor", error);
      setRefreshing(false)
    });
    
  }, []);
  
  const loadMore = () => {
      setLoading(true);
  
      const config = {
        method: 'get',
        url: `${endpoint.endpointUrl}/all-post/${offset}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    
      axios(config)
      .then((response) => {
        setLoading(false)
        
        if(!response?.data?.success){
          setHasMore(false)
        }else {
          const dataValues = Object.values(response?.data?.data)
          setPostsData([...postsData, ...dataValues])
          setOffset(offset + 1)
          // console.log("+++++++++++++++++++++++++++++++++++++++++++++++", dataValues)
        }
      })
      .catch((error) => {
        console.log("errorororoorororor", error);
        setLoading(false)
      });

  };
  
  useEffect(() => {
    // fetching users for swiping
    fetchUsers()
    
    setHasMore(true)
    setOffset(2)
  
    const config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/all-post/1`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios(config)
      .then((response) => {
        const dataValues = Object.values(response?.data?.data)
        setPostsData(dataValues)
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, [])

  useEffect(() => {
    if(users.length > 0 && users.length === 2){
      setUsersOffset(usersOffset + 1)

      fetchMoreUsers(usersOffset + 1)
    }
  }, [users.length])

  const renderFooter = () => {
    return (
      loading &&
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  
  const renderPosts = ({item}) => {
    if(!blockedPosts.includes(item?.id)){
      return (
        <View style={{marginVertical: 20, width:'88%', alignSelf:'center'}}>
          <Post
            navigation={navigation}
            userAvatar={item.user_profile_image}
            username={item.user_name}
            postId={item?.id}
            time={item.created_at}
            postText={item.text}
            nOfReactions={item.totalreactions}
            nOfComments={item.totalcomments}
            postImage={item.image}
            thumbnail={item.thumbnail}
            postVideo={item.video}
            react={item?.react}
            userId={item?.user_id}
            scrolled={scrolled}
          />
        </View>
    )
    }

  }

  const onSwipe = (direction, personId) => {

    if(direction === 'right'){

      setUsers(oldUsers => oldUsers.slice(0, -1));
      setSwiped(oldSwiped => [...oldSwiped, personId]);
      addFriend(personId)

    } else if (direction === 'left'){

      setUsers(oldUsers => oldUsers.slice(0, -1))
      setSwiped(oldSwiped => [...oldSwiped, personId]);
      removeUser(personId)
    }
  }

  const addFriend = (personId) => {
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/add-friend/${personId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      if(response.data.success){
        console.log("person has been swiped right")
      }
    })
    .catch(function (error) {
      console.log("Some Error Occured while swiping right   ", error);
    });
  }
  const removeUser = (personId) => {
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/remove-friend/${personId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      if(response.data.success){
        console.log("person has been swiped left and removed ")
      }
    })
    .catch(function (error) {
      console.log("Some Error Occured while swiping left   ", error);
    });
  }
  
  const retrieveLast = () => {
    setSwiped(swiped.slice(0, -1))
    let config = {
      method: 'get',
      url: `${endpoint.endpointUrl}/undo-friend/${swiped[swiped.length - 1]}`,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    };
    
    setRetrievalLoading(true)
    axios(config)
    .then(function (response) {
      setRetrievalLoading(false)
      if(response.data.success){
        setUsers([...users, response.data.data])
      }
    })
    .catch(function (error) {
      setRetrievalLoading(false)
      console.log(error);
    });
  }

  const ImScrolling = () => {
    console.log("it is scrolling")
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink, alignItems:'center'}}>

        {selectedOption === "feed" ? (

            <FlatList
              ListHeaderComponent={() => (
                <View style={styles.feedContainer}>
                  <View style={{width:'100%', alignItems: 'flex-start'}}>
                    <Header onSearchIconPress={() => navigation.navigate("SearchingScreen")} navigation={navigation} />
                  </View>
          
                  <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', borderWidth: 2, borderColor: colors.themeColorOrange, borderRadius: 10, overflow: 'hidden'}}>
                    <TouchableOpacity onPress={() => setSelectedOption('feed')} style={[{width: "50%", justifyContent:'center', alignItems: 'center', height: 50}, selectedOption === "feed" ? {backgroundColor: colors.themeColorOrange} : {backgroundColor: "white"}]}>
                      <Text style={[{fontSize: wp('4%'), fontWeight: 'bold'}, selectedOption === "feed" ? {color: "white"} : {color: colors.themeColorOrange}]}>Feed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedOption('swipe')} style={[{width: "50%", justifyContent:'center', alignItems: 'center', height: 50}, selectedOption === "swipe" ? {backgroundColor: colors.themeColorOrange} : {backgroundColor: "white"}]}>
                      <Text style={[{fontSize: wp('4%'), fontWeight: 'bold'}, selectedOption === "swipe" ? {color: "white"} : {color: colors.themeColorOrange}]}>Swipe</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.heading}>News Feed</Text>
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
              onEndReachedThreshold={0}
              onEndReached={() => hasMore && loadMore()}
              ListFooterComponent={renderFooter}
              // onScroll={ImScrolling}
            />

        ) : (

          <View style={styles.swipeContainer}>
            <StatusBar backgroundColor={colors.lightPink} barStyle={'dark-content'} />

            <View style={{width:'100%', alignItems: 'center'}}>
              <Header onSearchIconPress={() => navigation.navigate("SearchingScreen")} navigation={navigation} />
            </View>
    
            <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', borderWidth: 2, borderColor: colors.themeColorOrange, borderRadius: 10, overflow: 'hidden'}}>
              <TouchableOpacity onPress={() => setSelectedOption('feed')} style={[{width: "50%", justifyContent:'center', alignItems: 'center', height: 50}, selectedOption === "feed" ? {backgroundColor: colors.themeColorOrange} : {backgroundColor: "white"}]}>
                <Text style={[{fontSize: wp('4%'), fontWeight: 'bold'}, selectedOption === "feed" ? {color: "white"} : {color: colors.themeColorOrange}]}>Feed</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedOption('swipe')} style={[{width: "50%", justifyContent:'center', alignItems: 'center', height: 50}, selectedOption === "swipe" ? {backgroundColor: colors.themeColorOrange} : {backgroundColor: "white"}]}>
                <Text style={[{fontSize: wp('4%'), fontWeight: 'bold'}, selectedOption === "swipe" ? {color: "white"} : {color: colors.themeColorOrange}]}>Swipe</Text>
              </TouchableOpacity>
            </View>
              
              
            <Text style={styles.heading}>Swipe</Text>

            {users.length > 0 ? (
              <View style={styles.container}>
                {users.map(user => (
                  <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
                  <UserCard
                    onSwipe={onSwipe}
                    key={user.id}
                    name={user.user_name}
                    age={user.age}
                    userId={user.id}
                    profileImage={user.user_profile_image}
                  />
                  </TouchableOpacity>
                ))}
              </View>
            ) : <Text style={styles.text}>Wait till we fetch more users for you ........</Text>}

          </View>
        )}

        {
          selectedOption === 'swipe' ? (
            
            <View style={{position: 'absolute', bottom: 0, flexDirection:'row', justifyContent: 'space-between', marginBottom: 20, width:'85%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: colors.themeColorOrange, marginRight: 10}}>Swipe Left {'\n'}To Pass</Text>
                <AntDesign name="arrowleft" size={20} color={colors.themeColorOrange} />
              </View>
              
              <TouchableOpacity onPress={retrieveLast} activeOpacity={0.6} style={{backgroundColor: colors.themeColorOrange, width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 5}}>
                {retrievalLoading ? <ActivityIndicator size={30} color={'white'} /> : <FontAwesome name='undo' size={20} color={'white'} />}
              </TouchableOpacity>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="arrowright" size={20} color={colors.themeColorOrange} />
                <Text style={{color: colors.themeColorOrange, textAlign: 'right', marginLeft: 10}}>Swipe Right {'\n'}To Match</Text>
              </View>
            </View>
            
          ) : null
        }

        
    </View>
    
  );
};

export default Feed;

const styles = StyleSheet.create({
  feedContainer: {
    width: '100%',
    backgroundColor: colors.lightPink,
    alignSelf: 'center',
    alignItems: 'center'
  },
  heading: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    margin: 15,
    width: '87%'
  },
  swipeContainer: {
    width: '100%',
    backgroundColor: colors.lightPink,
    alignSelf: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  tinderCard: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor:'grey',
    color: 'orange'
  },
  text: {
    fontSize: hp('2%'),
    width: '80%',
    alignSelf: 'center',
    color: 'black',
    textAlign:'center',
    marginTop: hp("20%")
  }
});
