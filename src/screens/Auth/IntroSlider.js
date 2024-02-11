import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Entypo from 'react-native-vector-icons/Entypo'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import colors from '../../theme/colors';

const IntroSlider = ({navigation}) => {
    const slider = useRef();
    const slides = [
        {
        key: 1,
        screen: <Slide1 slider={slider} />,
        },
        {
        key: 2,
        screen: <Slide2 slider={slider} />,
        },
        {
        key: 3,
        screen: <Slide3 slider={slider} navigation={navigation} />,
        },
    ];

    const renderItem = ({item}) => {
        return item.screen;
    };

    return (
        <View style={{flex: 1}}>
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            onDone={() => navigation.navigate('Login')}
            activeDotStyle={{backgroundColor: colors.themeColorOrange}}
            showNextButton={false}
            showDoneButton={true}
            ref={(ref) => (slider.current = ref)}
        />
        </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({});
