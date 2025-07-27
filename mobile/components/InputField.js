import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function InputField({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  showEyeIcon = false,
  onEyePress = null,
  icon = null
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        {icon && (
          <Image source={icon} style={styles.inputIcon} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {showEyeIcon && (
          <TouchableOpacity style={styles.eyeButton} onPress={onEyePress}>
            <Image source={require('../assets/eye.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#666',
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  eyeButton: {
    padding: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
}); 