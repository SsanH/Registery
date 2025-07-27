import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

// Import components
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Divider from '../components/Divider';
import SocialButton from '../components/SocialButton';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRandomText = async () => {
    try {
      // Try to connect to the Node.js server using computer's IP address
      const response = await fetch('http://192.168.56.1:3001/random-text');
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching random text:', error);
      // Fallback message if server is not accessible
      return '🎉 Welcome to our platform! We\'re excited to have you here! ✨';
    }
  };

  const handleSubmit = async () => {
    console.log('Create Account button pressed');
    console.log('Form data:', formData);
    
    if (!formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    console.log('Starting registration process...');
    setLoading(true);
    try {
      const response = await fetch('https://tohar-register-dbb2b2a6hea5gqe0.israelcentral-01.azurewebsites.net/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Registration response:', response.status, data);

      if (response.ok) {
        console.log('Registration successful, fetching random text...');
        // Get random text from Node.js server and show toast
        const randomText = await fetchRandomText();
        console.log('Random text received:', randomText);
        
        Toast.show({
          type: 'success',
          text1: 'Registration Successful!',
          text2: randomText,
          position: 'top',
          visibilityTime: 4000,
        });

        // Navigate back to login after showing toast
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        Alert.alert('Error', data.detail || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      
      <View style={styles.formContainer}>
        <Text style={styles.registerTitle}>Sign up</Text>
        
        <InputField
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          icon={require('../assets/email.png')}
        />
        
        <InputField
          placeholder="Username"
          value={formData.username}
          onChangeText={(text) => setFormData({...formData, username: text})}
          icon={require('../assets/user.png')}
        />
        
        <InputField
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry={!showPassword}
          showEyeIcon={true}
          onEyePress={() => setShowPassword(!showPassword)}
          icon={require('../assets/lock.png')}
        />
        
        <InputField
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          secureTextEntry={!showConfirmPassword}
          showEyeIcon={true}
          onEyePress={() => setShowConfirmPassword(!showConfirmPassword)}
          icon={require('../assets/lock.png')}
        />
        
        <Button
          title="Create Account"
          onPress={handleSubmit}
          disabled={loading}
          loading={loading}
        />
        
        <Divider />
        
        <View style={styles.socialButtonsContainer}>
          <SocialButton 
            title="Google" 
            onPress={() => Alert.alert('Google', 'Google registration clicked')}
            style={styles.socialButton}
          />
          
          <SocialButton 
            title="Facebook" 
            onPress={() => Alert.alert('Facebook', 'Facebook registration clicked')}
            style={styles.socialButton}
          />
        </View>
        
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/')}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  registerTitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'normal',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  loginSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 