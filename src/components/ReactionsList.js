import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from 'react-native'
import React, {useRef} from 'react'
import { SvgXml } from 'react-native-svg';

// importing SVGs
import like from '../assets/svgs/like.svg';
import love from '../assets/svgs/love.svg';
import haha from '../assets/svgs/haha.svg';
import wow from '../assets/svgs/wow.svg';
import sad from '../assets/svgs/sad.svg';
import angry from '../assets/svgs/angry.svg';

const ReactionsList = ({onReactionPress, valueXY}) => {

    const sizes = {
        likeSize: useRef(new Animated.ValueXY({x: 1, y: 1})).current,
        loveSize: useRef(new Animated.ValueXY({x: 1, y: 1})).current,
        hahaSize: useRef(new Animated.ValueXY({x: 1, y: 1})).current,
        wowSize: useRef(new Animated.ValueXY({x: 1, y: 1})).current,
        angerSize: useRef(new Animated.ValueXY({x: 1, y: 1})).current,
        sadSize: useRef(new Animated.ValueXY({x: 1, y: 1})).current,
    }

    const increaseSize = (size) => {
        Animated.timing(size, {
          toValue: {x: 2, y: 2},
          duration: 150,
          easing: Easing.bounce,
          useNativeDriver: false
        }).start()

        setTimeout(() => {
            Animated.spring(size, {
                toValue: {x: 1, y: 1},
                useNativeDriver: false
            })
        }, 150)
    }
    
  return (
    <Animated.View style={[styles.container, {transform: [{scaleX: valueXY.x}, {scaleY: valueXY.y}]}]}>
        <TouchableOpacity onPress={() => {
            onReactionPress('like')
            increaseSize(sizes.likeSize)
        }}>
            <Animated.View style={{transform: [{scaleX: sizes.likeSize.x}, {scaleY: sizes.likeSize.y}]}}>
                <SvgXml xml={like} />
            </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            onReactionPress('love')
            increaseSize(sizes.loveSize)
        }}>
            <Animated.View style={{transform: [{scaleX: sizes.loveSize.x}, {scaleY: sizes.loveSize.y}]}}>
                <SvgXml xml={love} />
            </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            onReactionPress('haha')
            increaseSize(sizes.hahaSize)
        }}>
            <Animated.View style={{transform: [{scaleX: sizes.hahaSize.x}, {scaleY: sizes.hahaSize.y}]}}>
                <SvgXml xml={haha} />
            </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            onReactionPress('wow')
            increaseSize(sizes.wowSize)
        }}>
            <Animated.View style={{transform: [{scaleX: sizes.wowSize.x}, {scaleY: sizes.wowSize.y}]}}>
                <SvgXml xml={wow} />
            </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
            onReactionPress('anger')
            increaseSize(sizes.angerSize)
        }}>
            <Animated.View style={{transform: [{scaleX: sizes.angerSize.x}, {scaleY: sizes.angerSize.y}]}}>
                <SvgXml xml={angry} />
            </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            onReactionPress('sad')
            increaseSize(sizes.sadSize)
        }}>
            <Animated.View style={{transform: [{scaleX: sizes.sadSize.x}, {scaleY: sizes.sadSize.y}]}}>
                <SvgXml xml={sad} />
            </Animated.View>
        </TouchableOpacity>
        
    </Animated.View>
  )
}

export default ReactionsList

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center'
    }
})