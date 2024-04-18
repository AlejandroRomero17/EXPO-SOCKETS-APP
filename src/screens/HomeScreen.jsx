import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import WebSocket from 'react-native-websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { insertList } from '../../Api';

export default function HomeScreen() {
  const [temperature, setTemperature] = useState('0');
  const [humidity, setHumidity] = useState('0');
  const [objectDetected, setObjectDetected] = useState(false);
  const [objectDistance, setObjectDistance] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
  }, []);

  const handleData = (message) => {
    const data = message.data.split(',');
    setTemperature(data[0]);
    setHumidity(data[1]);
    setObjectDistance(data[2]);
    setObjectDetected(parseFloat(data[2]) < 20);
  };

  const onOpen = () => {
    console.log("WebSocket connection opened");
  };

  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const saveData = async () => {
    try {
      const code = generateRandomCode();
      const dataToSave = {
        code: code,
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        objectDetected: objectDetected ? 'Yes' : 'No',
        objectDistance: parseFloat(objectDistance)
      };

      await AsyncStorage.setItem('savedData', JSON.stringify(dataToSave));
      await insertList(dataToSave);
      
      console.log('Data saved and sent to the database:', dataToSave);
      Alert.alert('Successful Save', 'Data has been saved successfully.');

    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'An error occurred while trying to save the data.');
    }
  };

  const viewList = () => {
    navigation.navigate('JsonFormScreen');
  };

  const temperatureIcon = <FontAwesome5 name="thermometer-half" size={30} color="#333" />;
  const humidityIcon = <FontAwesome5 name="tint" size={30} color="#333" />;
  const objectIcon = <FontAwesome5 name="traffic-light" size={30} color="#333" />;
  const distanceIcon = <FontAwesome5 name="ruler" size={30} color="#333" />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          {temperatureIcon}
          <Text style={styles.text}>Temperature</Text>
        </View>
        <Text style={styles.value}>{temperature} °C</Text>
      </View>

      <View style={styles.card}>
        <View>
          {humidityIcon}
          <Text style={styles.text}>Humidity</Text>
        </View>
        <Text style={styles.value}>{humidity} %</Text>
      </View>

      <View style={styles.card}>
        <View>
          {objectIcon}
          <Text style={styles.text}>Object Detected</Text>
        </View>
        <Text style={styles.value}>{objectDetected ? 'Yes' : 'No'}</Text>
        <Text style={styles.value}>{objectDistance} cm</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={viewList}>
          <Text style={styles.buttonText}>View List</Text>
        </TouchableOpacity>
      </View>

      <WebSocket
        url="ws://192.168.0.111:81"
        onOpen={onOpen}
        onMessage={handleData}
        onError={(error) => console.log('WebSocket Error:', error)}
        reconnect={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 20,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
