import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    ActivityIndicator
  } from 'react-native';
  import React, {useState, useEffect, useCallback} from 'react';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import colors from '../../theme/colors';
  import AnimatedLottieView from 'lottie-react-native';
  import {useSelector} from 'react-redux';
  import firestore from '@react-native-firebase/firestore';
  import Feather from 'react-native-vector-icons/Feather';
  import Input from '../../components/Input';
  import Entypo from 'react-native-vector-icons/Entypo';
  import ChatHeader from '../../components/ChatHeader';
  import Modal from 'react-native-modal';
  import {createThumbnail} from 'react-native-create-thumbnail';
  import ImagePicker from 'react-native-image-crop-picker';
  import storage from '@react-native-firebase/storage';
  import FastImage from 'react-native-fast-image';
  
  const ChatScreen = ({navigation, route}) => {
    const [messageText, setMessageText] = useState('');
    const [pickedImage, setPickedImage] = useState('');
    const [pickedVideo, setPickedVideo] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatExists, setChatExists] = useState(false);
    const [currentChatId, setCurrentChatId] = useState('');
    const [readByIds, setReadByIds] = useState([]);
    const [typing, setTyping] = useState(false);
    const [messageSendingLoading, setMessageSendingLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [deletedFor, setDeletedFor] = useState({});
    const [blockedBy, setBlockedBy] = useState([]);
  
    const {data} = useSelector(state => state.authData);
    const otherUserId = route.params?.otherUserId;
    const {userData, navigatedFrom} = route.params;
  
    useEffect(() => {
      if (!messageText) {
        firestore().collection('chats').doc(currentChatId).update({
          typing: false,
        });
      } else if (messageText.length === 1) {
        firestore().collection('chats').doc(currentChatId).update({
          typing: data.id,
        });
      }
    }, [messageText]);
  
    useEffect(() => {
      firestore()
        .collection('chats')
        .doc(`${data.id}_${otherUserId}`)
        .onSnapshot(snapshot => {
          if (snapshot?.exists) {
            setCurrentChatId(`${data.id}_${otherUserId}`);
            setDeletedFor(snapshot.data().deletedFor);
            setChatExists(true);
            setMessages(snapshot.data().messages);
            setReadByIds(snapshot.data().readBy);
            setTyping(snapshot.data().typing);
            setBlockedBy(snapshot.data().blockedBy)
            
          } else {
            firestore()
              .collection('chats')
              .doc(`${otherUserId}_${data.id}`)
              .onSnapshot(snapshot => {
                if (snapshot?.exists) {
                  setCurrentChatId(`${otherUserId}_${data.id}`);
                  setChatExists(true);
                  setDeletedFor(snapshot.data().deletedFor);
                  setReadByIds(snapshot.data().readBy);
                  setTyping(snapshot.data().typing);
                  setMessages(snapshot.data().messages);
                  setBlockedBy(snapshot.data().blockedBy)
                }
                
              });
          }
        });
    }, []);
  
    useEffect(() => {
      messageSeen();
    }, [userData, chatExists, messages]);
  
    const messageSeen = () => {
      if (chatExists) {
        firestore()
          .collection("chats")
          .doc(currentChatId)
          .get()
          .then((resp) => {
            if (!resp.data()?.readBy.includes(data?.id)) {
              firestore()
                .collection("chats")
                .doc(currentChatId)
                .update({
                  readBy: [...resp.data()?.readBy, data?.id],
                })
                .then(() => {
                  console.log("Message Read successfully");
                })
                .catch(() => {
                  console.log("Something went wrong while reading message");
                });
            }
          });
      }
    };
  
    const renderMessages = ({item, index}) => {
        if(item.messageTime >= deletedFor[data.id]){
          return (
            <View key={index} style={styles.messageContainer}>
              <View style={[
                styles.message,
                item.senderId === data.id ? styles.messageByMe : styles.messageByOther
              ]}>
                {item.imageUrl ? (
                  <FastImage
                    source={{uri: item.imageUrl}}
                    style={styles.messageImage}
                  />
                ) : null}
        
                {item.videoUrl ? (
                  <TouchableOpacity 
                    onPress={() => navigation.navigate('VideoPlayer', {url: item.videoUrl})}
                    style={styles.videoContainer}
                  >
                    <FastImage
                      source={{uri: item.thumbnailUrl}}
                      style={styles.messageImage}
                    />
                    <Entypo 
                      name="controller-play"
                      color="black" 
                      size={55} 
                      style={styles.playButton} 
                    /> 
                  </TouchableOpacity>
                ) : null}
                
                <Text style={styles.messageText}>{item.messageText}</Text>
                <Text style={styles.time}>
                  {new Date(item.messageTime).toLocaleString()}
                </Text>
              </View>
        
              {item.senderId === data.id && 
                index === 0 &&
                readByIds.includes(otherUserId) && (
                  <Text style={styles.seenMessage}>seen</Text>
                )
              }
        
              {item.senderId === data.id && 
                index === 0 &&
                !readByIds.includes(otherUserId) && (
                  <Text style={styles.seenMessage}>sent</Text>
                )
              }
            </View>
          );
        }
    };
  
    const startChat = ({videoUrl = null, imageUrl = null, thumbnailUrl = null} = {}) => {
      
      firestore()
        .collection('chats')
        .doc(`${data.id}_${otherUserId}`)
        .set({
          chatId: `${data.id}_${otherUserId}`,
          ids: [`${data.id}`, `${otherUserId}`],
          lastMessageTime: new Date().getTime(),
          readBy: [data.id],
          lastMessage: {
            text: messageText,
            senderId: data.id,
          },
          deletedFor: {
            [data.id]: new Date().getTime(),
            [otherUserId]: new Date().getTime()
          },
          blockedBy: [],
          messages: [
            {
              messageText: messageText,
              senderId: data.id,
              messageTime: new Date().getTime(),
              imageUrl: imageUrl,
              videoUrl: videoUrl,
              thumbnailUrl: thumbnailUrl
            },
          ],
        })
        .then(() => {
          setMessageSendingLoading(false)
          setPickedImage('');
          setPickedVideo('');
          setMessageText('');
          setThumbnail('');
        })
        .catch(() => {
          setMessageSendingLoading(false)
        });
    };
  
  
    const sendMessage = async ({ videoUrl = null, imageUrl = null, thumbnailUrl = null } = {}) => {
      try {
        const updatedChat = {
          lastMessageTime: new Date().getTime(),
          readBy: [data.id],
          lastMessage: {
            text: messageText,
            senderId: data.id,
          },
          messages: [
            {
              messageText: messageText,
              senderId: data.id,
              messageTime: new Date().getTime(),
              imageUrl,
              videoUrl,
              thumbnailUrl
            },
            ...messages,
          ],
        };
    
        await firestore()
          .collection('chats')
          .doc(currentChatId)
          .update(updatedChat);
    
        setMessageSendingLoading(false);
        setPickedImage('');
        setPickedVideo('');
        setMessageText('');
        setThumbnail('');
      } catch (error) {
        setMessageSendingLoading(false);
        console.error('Something went wrong while sending message:', error);
      }
    };
  
    const onSend = async () => {
      if (!chatExists) {
        try {
          if (pickedImage.path) {
            setMessageSendingLoading(true);
            const imageUrl = await uploadFile(pickedImage.path);
            startChat({ imageUrl });
          } else if (pickedVideo.path) {
            setMessageSendingLoading(true);
            const videoUrl = await uploadFile(pickedVideo.path);
            const thumbnailUrl = await uploadFile(thumbnail.path);
            startChat({ videoUrl, thumbnailUrl });
          } else if (messageText) {
            setMessageSendingLoading(true);
            startChat();
          } else {
            Alert.alert("You can not send an empty message");
          }
        } catch (error) {
          console.error(error);
          setMessageSendingLoading(false);
          Alert.alert("Failed to send message. Please try again.");
        }
      } else {
        try {
          if (pickedImage.path) {
            setMessageSendingLoading(true);
            const imageUrl = await uploadFile(pickedImage.path);
            sendMessage({ imageUrl });
          } else if (pickedVideo.path) {
            setMessageSendingLoading(true);
            const videoUrl = await uploadFile(pickedVideo.path);
            const thumbnailUrl = await uploadFile(thumbnail.path);
            sendMessage({ videoUrl, thumbnailUrl });
          } else if (messageText) {
            setMessageSendingLoading(true);
            sendMessage();
          } else {
            Alert.alert("You can not send an empty message");
          }
        } catch (error) {
          console.error(error);
          setMessageSendingLoading(false);
          Alert.alert("Failed to send message. Please try again.");
        }
      }
    };
    
    const uploadFile = async (path) => {
      const randomRef = Math.ceil(Math.random() * 1000000);
      const fileRef = storage().ref(`${randomRef}`);
      await fileRef.putFile(path);
      return fileRef.getDownloadURL();
    };
  
    const pickVideo = () => {
      setPickedImage('');
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: 'video',
      }).then(video => {
        setModalVisible(false);
        setPickedVideo(video);
        createThumbnail({
          url: video.path,
          timeStamp: 10000,
        })
          .then(response => setThumbnail(response))
          .catch(err => console.log({err}));
      });
    };
    const pickImage = () => {
      setPickedVideo('');
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        mediaType: 'photo',
        cropping: true,
      }).then(image => {
        setModalVisible(false);
        setPickedImage(image);
      });
    };
  
    
    const onBlockPress = () => {
      firestore()
      .collection('chats')
      .doc(currentChatId)
      .update({
        blockedBy: [...blockedBy, data.id]
      })
      .then(() => {
        console.log('User Blocked Successfully')
      })
      .catch(err => console.log(err))
    }
    const onUnblockPress = () => {
      firestore()
      .collection('chats')
      .doc(currentChatId)
      .update({
        blockedBy: blockedBy.filter(each => each !== data.id)
      })
      .then(() => {
        console.log('User Blocked Successfully')
      })
      .catch(err => console.log(err))
    }
    
    const onDeletePress = () => {
      firestore()
      .collection('chats')
      .doc(currentChatId)
      .update({
        deletedFor: {
          [otherUserId]: deletedFor[otherUserId],
          [data.id]:  new Date().getTime()
        },
        lastMessage: {
          text: ''
        }
      })
      .then(() => {
        console.log('chat deleted successfully')
      })
      .catch(err => console.log(err))
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.chatHeaderContainer}>
          <ChatHeader
            blocked={blockedBy.includes(data.id) ? true : false}
            onUnblockPress={onUnblockPress}
            onBlockPress={onBlockPress}
            onDeletePress={onDeletePress}
            onBackPress={() => navigation.goBack()}
            navigatedFrom={navigatedFrom} userData={userData}
          />
        </View>
        <View style={styles.messagesContainer}>
          <FlatList data={messages} renderItem={renderMessages} inverted={true} />
          {typing === otherUserId ? (
            <View style={styles.lottieCont}>
              <AnimatedLottieView
                source={require('../../assets/lottie/typing-lottie.json')}
                autoPlay
                loop
              />
            </View>
          ) : null}
        </View>
        {
          blockedBy.includes(data.id) ? <Text style={styles.blockText}>You have blocked this user</Text> : blockedBy.includes(otherUserId) ? <Text style={styles.blockText}>You have been blocked</Text> : (
            <View style={styles.messageInputContainer}>
              <View style={{width: '70%', borderRadius: 50}}>
                {pickedImage.path ? (
                  <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <Entypo
                      onPress={() => setPickedImage('')}
                      name="circle-with-cross"
                      color={'black'}
                      size={25}
                      style={styles.crossIcon}
                    />
                    <FastImage
                      source={{uri: pickedImage.path}}
                      style={styles.image}
                    />
                  </View>
                ) : null}
                {pickedVideo.path ? (
                  <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', {url: pickedVideo.path})} style={{justifyContent:'center', alignItems: 'center'}}>
                    <Entypo
                      onPress={() => [setPickedVideo(''), setThumbnail('')]}
                      name="circle-with-cross"
                      color={'black'}
                      size={25}
                      style={styles.crossIcon}
                    />
                    <FastImage
                      source={{uri: thumbnail.path}}
                      style={styles.image}
                    />
                    <Entypo name='controller-play' color='black' size={55} style={{position: 'absolute'}} /> 
                  </TouchableOpacity>
                ) : null}
                <Input
                  placeholder={'Write your message'}
                  value={messageText}
                  onChange={changedText => setMessageText(changedText)}
                  placeholderColor="grey"
                  style={styles.messageInput}
                />
              </View>
      
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setModalVisible(true)}
                style={styles.attachmentBtn}>
                <Entypo name="attachment" size={25} color={'grey'} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={messageSendingLoading}
                activeOpacity={0.6}
                onPress={onSend}
                style={styles.sendBtn}>
                  {messageSendingLoading ? <ActivityIndicator color={'black'} size={hp('3.5%')} /> : <Feather name="send" size={25} color={colors.themeDarkBrown} />}
              </TouchableOpacity>
            </View>
          )
        }
        <Modal
          isVisible={isModalVisible}
          onBackButtonPress={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <Entypo
              onPress={() => setModalVisible(false)}
              name="circle-with-cross"
              color={'black'}
              size={25}
              style={styles.cross}
            />
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.option}>Upload a photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickVideo}>
              <Text style={styles.option}>Upload a video</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default ChatScreen;
  
  const styles = StyleSheet.create({
    modal: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
    },
    cross: {
      alignSelf: 'flex-end',
      padding: 10,
    },
    crossIcon: {
      position: 'absolute',
      top: 25,
      right: 25,
      zIndex: 30,
      backgroundColor:'white',
      padding: 5,
      borderRadius: 30
    },
    option: {
      padding: 15,
      fontSize: hp('3%'),
      color: 'black',
    },
    image: {
        width: '90%',
        height: hp('40%'),
        backgroundColor: 'lightyellow',
        margin: 10,
        borderRadius: 30,
    },
    messageImage: {
        width: '90%',
        height: hp('40%'),
        backgroundColor: 'lightyellow',
        margin: 10,
        borderRadius: 10,
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'space-between',
    },
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
    chatHeaderContainer: {
      position: 'absolute',
      top: 10,
      width: '100%',
      zIndex: 30,
    },
    otherUserMessage: {
      backgroundColor: colors.themeOrange,
      padding: 15,
      alignSelf: 'flex-start',
      borderRadius: 10,
      marginHorizontal: 25,
      marginTop: 60,
    },
    yourMessage: {
      backgroundColor: colors.themeDarkBrown,
      padding: 15,
      alignSelf: 'flex-end',
      borderRadius: 10,
      marginHorizontal: 25,
      marginTop: 10,
    },
    messagesContainer: {
      width: '100%',
      paddingTop: hp('7%'),
      flex: 1,
    },
    messageInputContainer: {
      width: '95%',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'lightgrey',
      marginBottom: 6,
    },
    messageInput: {
      paddingHorizontal: 5,
      width: '100%',
      borderRadius: 30,
      color: 'black',
    },
    attachmentBtn: {
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'grey',
      alignSelf: 'flex-end',
    },
    sendBtn: {
      padding: 15,
      backgroundColor: colors.themeLightOrange,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.themeDarkBrown,
      alignSelf: 'flex-end',
    },
    messageByOther: {
      width: wp('70%'),
      backgroundColor: colors.themeDarkBrown,
      borderRadius: 10,
      alignSelf: 'flex-start',
      margin: 10,
    },
    messageByMe: {
      width: wp('70%'),
      backgroundColor: colors.themeLightOrange,
      alignSelf: 'flex-end',
      borderRadius: 15,
      margin: 10,
      borderRadius: 10
    },
    messageText: {
      fontSize: hp('2.2%'),
      color: 'black',
      padding: 15,
    },
    time: {
      color: 'rgba(0,0,0,0.7)',
      marginLeft: 12,
      marginBottom: 3,
      fontSize: hp('1.7%'),
    },
    lottieCont: {
      width: '20%',
      height: hp('6%'),
      paddingLeft: wp('5%'),
    },
    seenMessage: {
      alignSelf:'flex-end',
      marginRight: 20,
      marginTop: -5,
      marginBottom: 10
    },
    blockText: {
      width: '90%',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: hp('2.2%'),
      color: 'grey',
      marginVertical: 15
    }
  });
  