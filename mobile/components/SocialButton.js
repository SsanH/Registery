import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

export default function SocialButton({ title, onPress, style = {} }) {
  const getIcon = () => {
    if (title === 'Google') {
      return require('../assets/google.png');
    } else if (title === 'Facebook') {
      return require('../assets/facebook.png');
    }
    return null;
  };

  return (
    <TouchableOpacity style={[styles.socialButton, style]} onPress={onPress}>
      <View style={styles.buttonContent}>
        {getIcon() && (
          <Image source={getIcon()} style={styles.socialIcon} />
        )}
        <Text style={styles.socialButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#333',
  },
}); 