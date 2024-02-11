import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';

const VideoPlayer = ({route, navigation}) => {
  const { url } = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <View style={{flex: 1, backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5} style={styles.backButton}>
        <Entypo name='chevron-left' color='black' size={25} />
      </TouchableOpacity>
      <Video 
          source={{uri: `https://customdemo.website/apps/saw-you-on-the-train/public/assets/uploads/post/${url}`}}
          style={{ width: wp('100%'), height: '100%', justifyContent:'center', alignItems:'center'}}
          controls={true}
          paused={false}
          fullscreen={true}
          resizeMode="cover"
          onLoad={() => setLoading(false)}
      />
    </View>
  )
}

export default VideoPlayer

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    backgroundColor:'white',
    padding: 10,
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 30,
    borderRadius:5
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }
})
