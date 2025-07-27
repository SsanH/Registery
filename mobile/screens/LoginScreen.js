import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

// Import components
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import SocialLoginSection from '../components/SocialLoginSection';
import RegisterSection from '../components/RegisterSection';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('https://tohar-register-dbb2b2a6hea5gqe0.israelcentral-01.azurewebsites.net/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Login successful!');
        router.push('/explore');
      } else {
        Alert.alert('Error', data.detail || 'Login failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      
      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Log in</Text>
        
        <LoginForm onSubmit={handleLoginSubmit} loading={loading} />
        
        <SocialLoginSection />
        
        <RegisterSection />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'normal',
  },
}); 