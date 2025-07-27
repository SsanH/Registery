import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function RegisterSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>Have no account yet?</Text>
      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  registerButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 