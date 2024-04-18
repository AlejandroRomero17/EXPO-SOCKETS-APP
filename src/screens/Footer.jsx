import React from 'react';
import { View, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={{ alignItems: 'center', backgroundColor: '#c1e0e0', paddingVertical: 5 }}>
      <Text style={{ fontSize: 16, color: 'black' }}>Developed by Alejandro Romero & Mariano Islas</Text>
      <Text style={{ marginTop: 5, fontSize: 12 }}>
        &copy; 2024 UTXJ.
      </Text>
    </View>
  );
};

export default Footer;
