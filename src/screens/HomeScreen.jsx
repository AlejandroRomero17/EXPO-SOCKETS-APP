import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import WebSocket from 'react-native-websocket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { insertData } from '../../Api';

/**
 * Componente principal para la pantalla de inicio.
 * Muestra los datos de temperatura, humedad, detección de objetos y distancia del objeto.
 * Permite guardar los datos y ver la lista de datos guardados.
 */
export default function HomeScreen() {
  const [temperature, setTemperature] = useState('0'); // Estado para la temperatura
  const [humidity, setHumidity] = useState('0'); // Estado para la humedad
  const [objectDetected, setObjectDetected] = useState(false); // Estado para la detección de objetos
  const [objectDistance, setObjectDistance] = useState(0); // Estado para la distancia del objeto
  const navigation = useNavigation();

  useEffect(() => {
    // Efecto de carga inicial, no realiza ninguna acción
  }, []);

  /**
   * Maneja los datos recibidos del WebSocket.
   * Actualiza los estados de temperatura, humedad, detección de objetos y distancia del objeto.
   * @param {Object} message - Mensaje recibido del WebSocket.
   */
  const handleData = (message) => {
    const data = message.data.split(',');
    setTemperature(data[0]);
    setHumidity(data[1]);
    setObjectDistance(data[2]);
    setObjectDetected(parseFloat(data[2]) < 20);

     // Imprimir los datos recibidos en la terminal
     console.log('Temperatura:', data[0]);
     console.log('Humedad:', data[1]);
     console.log('Distancia del objeto:', data[2]);
  };

  /**
   * Callback para la apertura de la conexión WebSocket.
   * Registra en la consola que la conexión se ha abierto.
   */
  const onOpen = () => {
    console.log("WebSocket connection opened");
  };

  /**
   * Genera un código aleatorio alfanumérico de 6 caracteres.
   * @returns {string} - Código aleatorio generado.
   */
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  /**
   * Guarda los datos actuales en AsyncStorage y en la base de datos.
   * Muestra una alerta en caso de éxito o error.
   */
  const saveData = async () => {
    try {
      const id = generateRandomCode(); // Genera un código único para identificar los datos
      const dataToSave = {
        id: id,
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        objectDetected: objectDetected ? 'Yes' : 'No',
        objectDistance: parseFloat(objectDistance)
      };

      await AsyncStorage.setItem('savedData', JSON.stringify(dataToSave)); // Guarda los datos en AsyncStorage
      await insertData(dataToSave); // Guarda los datos en la base de datos

      console.log('Data saved and sent to the database:', dataToSave);
      Alert.alert('Successful Save', 'Data has been saved successfully.');

    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'An error occurred while trying to save the data.');
    }
  };

  /**
   * Navega a la pantalla de lista de datos guardados.
   */
  const viewList = () => {
    navigation.navigate('JsonDataScreen');
  };

  // Iconos para temperatura, humedad y detección de objetos
  const temperatureIcon = <FontAwesome5 name="thermometer-half" size={30} color="#333" />;
  const humidityIcon = <FontAwesome5 name="tint" size={30} color="#333" />;
  const objectIcon = <FontAwesome5 name="traffic-light" size={30} color="#333" />;

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
        url="ws://192.168.0.253:81"
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
