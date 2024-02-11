import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({buttonText, textColor, fontSize, onPress, style, icon=null}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.container, style]}>
      {icon !== null ? icon : null}
      {typeof(buttonText) === "string" ? <Text style={{color: textColor, fontSize: fontSize, fontWeight: 'bold'}}>{buttonText}</Text> : buttonText }
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        paddingHorizontal: 15
    }
})