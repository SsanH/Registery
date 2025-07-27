import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Divider from './Divider';
import SocialButton from './SocialButton';

export default function SocialLoginSection() {
  return (
    <View style={styles.container}>
      <Divider />
      
      <View style={styles.socialButtonsContainer}>
        <SocialButton 
          title="Google" 
          onPress={() => Alert.alert('Google', 'Google login clicked')}
          style={styles.socialButton}
        />
        
        <SocialButton 
          title="Facebook" 
          onPress={() => Alert.alert('Facebook', 'Facebook login clicked')}
          style={styles.socialButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 5,
  },
}); 