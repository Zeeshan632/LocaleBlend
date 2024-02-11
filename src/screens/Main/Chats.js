import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import images from '../../assets/images';
import colors from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ChatCard from '../../components/ChatCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Button from '../../components/Button';

const Chats = ({navigation}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const {data} = useSelector(state => state.authData);
  const [chats, setChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatSearchText, setChatSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setShowSearchInput(false);
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllChats();
      handleSearchTextChange('')
    });
    return unsubscribe;
  }, [navigation]);

  const getAllChats = () => {
    setChatLoading(true);

    const unsubscribe = firestore()
      .collection('chats')
      .where('ids', 'array-contains', `${data.id}`)
      .orderBy('lastMessageTime', 'desc')
      .onSnapshot(snapshot => {
        const chatsData = [];
        snapshot?.forEach(eachChat => {
          const chatId = eachChat.data().ids.filter(id => {
            return id !== `${data.id}`;
          });

          chatsData.push({
            ...eachChat.data(),
            chatId,
          });
        });

        Promise.all(
          chatsData.map(async chat => {
            const userSnapshot = await firestore()
              .collection('users')
              .doc(`${chat.chatId}`)
              .get();

            return {
              ...userSnapshot.data(),
              lastMessage: chat.lastMessage.text,
              lastMessageTime: chat.lastMessageTime,
            };
          }),
        )
          .then(userData => {
            setChats(userData);
            setChatLoading(false);
          })
          .catch(error => {
            console.error(error);
            setChatLoading(false);
          });
      });

    return () => {
      unsubscribe();
    };
  };

  const renderChatCard = ({item}) => {
    return (
      <View style={{marginVertical: 10}}>
        <ChatCard
          onPress={() =>
            navigation.navigate('ChatScreen', {
              otherUserId: item.id,
              navigatedFrom: 'chats',
              userData: {
                user_name: item.name,
                user_profile_image: item.profileImage,
              },
            })
          }
          username={item.name}
          userAvatar={item.profileImage}
          lastMessage={item.lastMessage}
          lastMessageTime={new Date(item.lastMessageTime).toString()}
        />
      </View>
    );
  };

  const handleSearchTextChange = text => {
    setChatSearchText(text);

    const filtered = chats.filter(chat => {
      return chat.name.toLowerCase().includes(text.toLowerCase());
    })

    setFilteredChats(filtered)
  };


  return (
    <View style={styles.container}>
      <View>
        {showSearchInput ? (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search chat"
              placeholderTextColor={'grey'}
              style={styles.input}
              autoFocus={true}
              cursorColor="black"
              value={chatSearchText}
              onChangeText={handleSearchTextChange}
            />
            <AntDesign name="search1" size={30} color={colors.themeOrange} />
          </View>
        ) : (
          <Header
            navigation={navigation}
            showSearchIcon={true}
            onSearchIconPress={() => setShowSearchInput(true)}
          />
        )}
      </View>

      <View style={styles.allChatsContainer}>
        <Text style={styles.headingText}>Messages</Text>
        { chatLoading ? (
            <ActivityIndicator
              color={'black'}
              size={55}
              style={{marginVertical: 80}}
            />
        ) : chats.length <= 0 ? (
          <>
            <Text style={styles.warningText}>You don't have any chats with people.</Text>
            <View style={styles.buttonCont}>
              <Button onPress={() => navigation.navigate('SearchingScreen')} buttonText={'Search People'} textColor={'white'} style={{backgroundColor: colors.themeColorOrange, height: hp('5.5%'), borderRadius: 6}} />
            </View>
          </>
        ) : (
          <FlatList
            key={({item}) => item.id}
            data={showSearchInput ? filteredChats : chats}
            renderItem={renderChatCard}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  allChatsContainer: {
    width: '95%',
    backgroundColor: colors.lightPink,
    borderRadius: 25,
    marginTop: 5,
    alignSelf: 'center',
    padding: 15,
  },
  headingText: {
    color: 'black',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    margin: 15,
  },
  inputContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: colors.lightPink,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 12,
  },
  warningText: {
    color: 'grey',
    margin: 15,
    fontSize: hp('2.2%'),
    marginTop: 30
  },
  buttonCont: {
    width: '50%',
    marginLeft: 15
  }
});
