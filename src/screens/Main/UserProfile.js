import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Post from '../../components/Post';
import Header from '../../components/Header';
import ProfileBanner from '../../components/ProfileBanner';
import {useSelector} from 'react-redux';
import axios from 'axios';
import endpoint from '../../utils/endpoint';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';


const UserProfile = ({navigation}) => {
  const {data} = useSelector(state => state.authData);
  const {token} = useSelector(state => state.authData);

  const [postsData, setPostsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  let config = {
    method: 'get',
    url: `${endpoint.endpointUrl}/post/${data?.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    axios(config)
      .then(response => {
        setPostsData(response?.data?.data);
        setRefreshing(false);
      })
      .catch(error => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    axios(config)
      .then(response => {
        setPostsData(response?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.lightPink}}>
      <StatusBar backgroundColor={colors.lightPink} barStyle="dark-content" />

      <FlatList
        ListHeaderComponent={() => (
          <View style={{width: '95%', alignSelf: 'center'}}>
            <View>
              <HeaderWithoutSearch navigation={navigation}  />
            </View>
            <View style={{margin: 10}}>
              <ProfileBanner
                image={data.profile_image}
                username={data.name ? data.name : 'Not Found'}
                email={data.email ? data.email : 'Not Found'}
              />
            </View>


            <View style={{width: '95%', alignSelf: 'center', marginTop: 25}}>
              <Text style={styles.headingText}>Your Posts</Text>
            </View>
            {postsData.length <= 0 ? <Text style={styles.emptyText}>You currently have no posts</Text> : null}
          </View>
        )}
        data={postsData}
        renderItem={renderPosts}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default UserProfile;

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
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  upperHeadingText: {
    color: 'black',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: -16,
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
});
