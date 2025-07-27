import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image 
        source={require('../assets/mobileLogo.png')} 
        style={styles.logo}
        onError={(error) => console.log('Logo loading error:', error)}
        onLoad={() => console.log('Logo loaded successfully')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
}); 