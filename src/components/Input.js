import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../theme/colors';

const Input = ({
  placeholder,
  placeholderColor,
  style,
  secureTextEntry = false,
  keyboardType,
  value,
  onChange,
  eyeIcon=false,
  showPassword,
  autoCapitalize=null,
  autoFocus=false,
  inputFieldStyle
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChange}
        style={[styles.input, inputFieldStyle]}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
      />
      {
        eyeIcon ? (
          <TouchableOpacity activeOpacity={0.6} style={styles.eyeIcon} onPress={showPassword}>
            {
              secureTextEntry ? (
                <Entypo name='eye' size={22} color="grey" />
              ) : (
                <Entypo name='eye-with-line' size={22} color="grey" />
              )
            }
          </TouchableOpacity>
        ) : null
      }

    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 20,
    overflow: 'hidden'
  },
  input: {
    paddingLeft: 15,
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    padding: 4
  }
});
