import {StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../components/Header';
import CommentComp from '../../components/CommentComp';
import { useSelector } from 'react-redux';
import axios from 'axios';
import endpoint from '../../utils/endpoint';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

const Comment = ({navigation, route}) => {
  const {token} = useSelector(state => state.authData);
  const {postId} = route.params

  const [commentsData, setCommentsData] = useState([])
  const [loading, setLoading] = useState(false)


  let config = {
    method: 'get',
    url: `${endpoint.endpointUrl}/comment/${postId}`,
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  };

  const getAllComments = () => {
    setLoading(true)
    axios(config)
      .then((response) => {
        setLoading(false)
        setCommentsData(response.data.data);
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllComments()
    })
    return unsubscribe

  }, [navigation])
  
  const renderComments = ({item}) => {
    return (
      <View style={styles.reactionBarContainer}>
        <CommentComp
          userAvatar={item.user_profile_image}
          username={item.user_name}
          time={item.created_at}
          commentText={item.text}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <View>
          <HeaderWithoutSearch navigation={navigation} />
        </View>

        <View style={styles.topContainer}>
          <View style={styles.heading}>
            <Ionicons
              name="chevron-back"
              size={25}
              color="black"
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headingText}>Comments</Text>
          </View>

          {
            loading ? (
              <ActivityIndicator size={45} color={'black'} style={{marginTop: hp('10%')}} />
            ) : commentsData.length > 0 ? (
              <FlatList 
                data={commentsData}
                renderItem={renderComments}
                showsVerticalScrollIndicator={false}
              />
            ) : <Text style={{alignSelf: 'center', marginTop: 60, fontSize: hp('2%'), width: '75%', textAlign: 'center', color: 'black'}}>No one has commented on this post yet!</Text>
          }

        </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headingText: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginLeft: 15,
  },
  reactionBarContainer: {
    width: '96%',
    alignSelf: 'center',
    marginTop: 15,
  },
  backIcon: {
    padding: 6,
    marginLeft: 4
  },
  topContainer: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 25,
    marginVertical: 25,
    alignSelf: 'center',
    padding: 15,
    paddingBottom: 150,
  }
});
