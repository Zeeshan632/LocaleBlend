import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../theme/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NotificationCard from '../../components/NotificationCard'
import Header from '../../components/Header';

const Notification = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
          <Header navigation={navigation} />
        </View>

        <View style={{width: '95%', backgroundColor: colors.lightPink , borderRadius: 25, marginTop: 5, alignSelf: 'center', padding: 15}}>
          <Text style={{color: 'black', fontSize: wp('6%'),fontWeight: 'bold',margin: 15}}>Notifications</Text>
          <View style={{marginVertical: 10}}>
            <NotificationCard name="anonymous writer012" content="posted a new video" />
          </View>
          <View style={{marginVertical: 10}}>
            <NotificationCard name="anonymous writer012" content="posted a new video" />
          </View>
          <View style={{marginVertical: 10}}>
            <NotificationCard name="anonymous writer012" content="posted a new video" />
          </View>
          <View style={{marginVertical: 10}}>
            <NotificationCard name="anonymous writer012" content="posted a new video" />
          </View>
          <View style={{marginVertical: 10}}>
            <NotificationCard name="anonymous writer012" content="posted a new video" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({})