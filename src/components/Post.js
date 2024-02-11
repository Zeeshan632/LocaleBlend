import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

import images from '../assets/images';
import colors from '../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './Button';
import Button2 from './Button2';
import ReactionsList from './ReactionsList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import axios from 'axios';
import endpoint from '../utils/endpoint';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from './Input';
import FastImage from 'react-native-fast-image';
import { addToBlockedPosts } from '../redux/AuthSlice';
import { useDispatch } from 'react-redux';

// importing SVGs
import like from '../assets/svgs/like.svg';
import love from '../assets/svgs/love.svg';
import haha from '../assets/svgs/haha.svg';
import wow from '../assets/svgs/wow.svg';
import sad from '../assets/svgs/sad.svg';
import angry from '../assets/svgs/angry.svg';

const Post = ({
  userAvatar,
  username,
  postId,
  time,
  postText,
  nOfReactions,
  nOfComments,
  postImage,
  thumbnail,
  postVideo,
  navigation,
  react,
  userId,
  scrolled,
}) => {
  const [showReactionList, setShowReactionList] = useState(false);
  const [reactionSelected, setReactionSelected] = useState(null);
  const [reactionCount, setReactionCount] = useState(nOfReactions);
  const [commentsCount, setCommentsCount] = useState(nOfComments);
  const [reactDeletionLoading, setReactDeletionLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [showRemovePost, setShowRemovePost] = useState(false);
  const Dispatch = useDispatch();

  const {token, data, blockedPosts} = useSelector(state => state.authData);

  useEffect(() => {
    if (react === 'love') {
      setReactionSelected(react);
    } else if (react === 'haha') {
      setReactionSelected(react);
    } else if (react === 'anger') {
      setReactionSelected(react);
    } else if (react === 'sad') {
      setReactionSelected(react);
    } else if (react === 'wow') {
      setReactionSelected(react);
    } else if (react === 'like') {
      setReactionSelected(react);
    }
  }, []);

  useEffect(() => {
    if (scrolled) {
      setShowReactionList(false);
      decreaseSize();
    }
  }, []);

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const increaseSize = () => {
    Animated.spring(pan, {
      toValue: {x: 1, y: 1},
      useNativeDriver: false,
    }).start();
  };

  const decreaseSize = () => {
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  };

  const onReactionPress = reaction => {
    let data = new FormData();
    data.append('post_id', postId);
    data.append('text', reaction);

    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/reaction`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.success) {
          setReactionCount(reactionCount + 1);
        }
      })
      .catch(function (error) {
      });

    setTimeout(() => {
      setReactionSelected(reaction);
      setShowReactionList(false);
      decreaseSize();
    }, 150);
  };

  const deleteReaction = () => {
    setReactDeletionLoading(true);
    setReactionSelected(null);
    setReactionCount(reactionCount - 1);

    let config = {
      method: 'delete',
      url: `${endpoint.endpointUrl}/reaction/${postId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setReactDeletionLoading(false);
      })
      .catch(function (error) {
        setReactDeletionLoading(false);
      });
  };
  const sendComment = () => {
    setCommentLoading(true);

    let data = new FormData();
    data.append('post_id', postId);
    data.append('text', commentText);

    let config = {
      method: 'post',
      url: `${endpoint.endpointUrl}/comment`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.success) {
          setCommentsCount(commentsCount + 1);
          setCommentLoading(false);
          setCommentText('');
          setShowCommentInput(false);
          Toast.show({
            type: 'success',
            text1: 'Comment posted successfully',
          });
        }
      })
      .catch(function (error) {
        setCommentLoading(false);
      });
  };

  const reactButtonContent =
    reactionSelected === null ? (
      'React'
    ) : reactionSelected === 'like' ? (
      <SvgXml xml={like} />
    ) : reactionSelected === 'love' ? (
      <SvgXml xml={love} />
    ) : reactionSelected === 'haha' ? (
      <SvgXml xml={haha} />
    ) : reactionSelected === 'wow' ? (
      <SvgXml xml={wow} />
    ) : reactionSelected === 'sad' ? (
      <SvgXml xml={sad} />
    ) : reactionSelected === 'anger' ? (
      <SvgXml xml={angry} />
    ) : null;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowRemovePost(false);
        setShowReactionList(false);
        setTimeout(() => {
          decreaseSize();
        }, 100);
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={
              data.id !== userId
                ? () =>
                    navigation.navigate('OtherUserProfile', {
                      otherUserId: userId,
                    })
                : () => navigation.navigate('UserProfile')
            }
            activeOpacity={0.6}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              source={{
                uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/user/${userAvatar}`,
              }}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
              }}
            />
            <View style={{marginLeft: 8}}>
              <Text style={{color: 'black', fontSize: wp('4.5%')}}>
                {username}
              </Text>
              <Text
                style={{color: colors.themeColorOrange, fontSize: wp('3.5%')}}>
                <MaterialCommunityIcons
                  name="web"
                  color={colors.themeColorOrange}
                  size={15}
                />{' '}
                Public
              </Text>
            </View>
          </TouchableOpacity>
          <Entypo
            onPress={() => setShowRemovePost(!showRemovePost)}
            name="dots-three-horizontal"
            size={25}
            color={colors.themeLightOrange}
            style={{marginRight: 6, height: 25}}
          />
          {
            showRemovePost ? (
              <TouchableOpacity activeOpacity={0.6} onPress={() => Dispatch(addToBlockedPosts(postId))} style={styles.modalCont}>
                <Text style={{color: 'black', paddingVertical: 10}}>Remove this post</Text>
              </TouchableOpacity>
            ) : null
          }
        </View>

        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text
            style={{
              color: 'rgba(0,0,0,0.7)',
              marginVertical: 8,
              fontSize: wp('3.7%'),
              lineHeight: 21,
              width: '95%',
              alignSelf: 'center',
            }}>
            {postText}
          </Text>
        </View>

        {postImage ? (
          <Image
            source={{
              uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/post/${postImage}`,
            }}
            style={styles.postImage}
          />
        ) : null}
        {postVideo ? (
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() =>
              navigation.navigate('VideoPlayer', {url: postVideo})
            }>
            <FastImage
              source={{
                uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/post/${thumbnail}`,
              }}
              style={styles.postImage}
            />
            <View style={styles.playIcon}>
              <AntDesign name="caretright" size={25} color="black" />
            </View>
          </TouchableOpacity>
        ) : null}

        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Reactions', {postId})}>
            <Text
              style={{
                fontSize: wp('3.5%'),
                color: 'grey',
                marginRight: 15,
              }}>
              {reactionCount} Likes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Comments', {postId})}>
            <Text
              style={{fontSize: wp('3.5%'), color: 'grey', marginRight: 15}}>
              {commentsCount} Comments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{fontSize: wp('3.5%'), color: 'grey'}}>3 Shares</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.themeLightOrange,
            width: '100%',
          }}>
          <View style={{width: '46%', justifyContent: 'center'}}>
            {reactDeletionLoading ? (
              <ActivityIndicator size={20} color={'black'} />
            ) : (
              <Button2
                buttonText={reactButtonContent}
                textColor={colors.themeColorOrange}
                fontSize={wp('3.5%')}
                style={{width: '100%'}}
                onPress={() => {
                  if (reactionSelected !== null) {
                    deleteReaction();
                  } else {
                    setShowReactionList(true);
                    increaseSize();
                  }
                }}
              />
            )}
          </View>
          <View style={{width: '46%'}}>
            <Button2
              onPress={() => setShowCommentInput(!showCommentInput)}
              buttonText="Comment"
              textColor={colors.themeColorOrange}
              fontSize={wp('3.5%')}
              style={{width: '90%'}}
            />
          </View>
          <View style={{width: '46%'}}>
            <Button2
              buttonText="Share"
              textColor={colors.themeColorOrange}
              fontSize={wp('3.5%')}
              style={{width: '90%'}}
            />
          </View>

          {/* Reactions List */}
          {showReactionList ? (
            <View style={styles.reactionsListCont}>
              <ReactionsList onReactionPress={onReactionPress} valueXY={pan} />
            </View>
          ) : null}
        </View>
        {showCommentInput ? (
          <View style={styles.commentContainer}>
            <View style={{width: '80%'}}>
              <Input
                placeholder={'write your comment'}
                value={commentText}
                onChange={changedText => setCommentText(changedText)}
              />
            </View>
            <TouchableOpacity
              onPress={sendComment}
              activeOpacity={0.6}
              style={{
                backgroundColor: colors.themeColorOrange,
                padding: 15,
                borderRadius: 12,
              }}>
              {commentLoading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <FontAwesome name="paper-plane" color={'white'} size={25} />
              )}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Post;

const styles = StyleSheet.create({
  reactionsListCont: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    width: '80%',
  },
  postImage: {
    width: '100%',
    height: hp('40%'),
    resizeMode: 'cover',
    alignSelf: 'center',
    marginVertical: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 50,
  },
  commentContainer: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalCont: {
    width: wp('30%'),
    backgroundColor: 'white',
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  }
});
