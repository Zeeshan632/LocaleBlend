import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import Header from '../../components/Header';
import ReactionBar from '../../components/ReactionBar';
import endpoint from '../../utils/endpoint';
import { useSelector } from 'react-redux';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';



const Reactions = ({navigation, route}) => {

  const [reactionsData, setReactionsData] = useState([])
  const {token} = useSelector(state => state.authData);
  
  const {postId} = route.params

  let config = {
    method: 'get',
    url: `${endpoint.endpointUrl}/reaction/${postId}`,
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  };

  const getAllReactions = () => {
    axios(config)
      .then((response) => {
        setReactionsData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllReactions()
    })
    return unsubscribe

  }, [navigation])


  const renderReactions = ({item}) => {
    return (
      <View style={styles.reactionBarContainer}>
        <ReactionBar
          userAvatar={item.user_profile_image}
          username={item.user_name}
          reactionIcon={item.text}
        />
      </View>
    )
  }
  
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

          <FlatList
            ListHeaderComponent={() => (
              <>
              <HeaderWithoutSearch navigation={navigation} />
              <View
                style={{
                  width: '95%',
                  backgroundColor: colors.lightPink,
                  borderRadius: 25,
                  marginVertical: 25,
                  alignSelf: 'center',
                  padding: 15,
                }}>
                <View style={styles.heading}>
                  <Ionicons
                    name="chevron-back"
                    size={25}
                    color="black"
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}
                  />
                  <Text style={styles.headingText}>List of Reactions</Text>
                </View>
              </View>
              </>
            )}
            data={reactionsData}
            renderItem={renderReactions}
          />

    </View>
  );
};

export default Reactions;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginVertical: 10,
  },
  backIcon: {
    padding: 6,
    marginLeft: 4
  },
});
