import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from './InputField';
import Button from './Button';

export default function LoginForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
        keyboardType="email-address"
        icon={require('../assets/email.png')}
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
      
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      
      <Button
        title="Sign In"
        onPress={handleSubmit}
        disabled={loading}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
}); 