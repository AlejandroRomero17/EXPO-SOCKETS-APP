import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getData } from '../../Api'; // Cambiamos getLists por getData
import { FontAwesome5 } from '@expo/vector-icons';

const JsonDataScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getData();
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.row}>
        <FontAwesome5 name="thermometer-half" size={20} color="#333" />
        <Text style={styles.label}>Temperature:</Text>
      </View>
      <Text style={styles.value}>{item.temperature} °C</Text>

      <View style={styles.row}>
        <FontAwesome5 name="tint" size={20} color="#333" />
        <Text style={styles.label}>Humidity:</Text>
      </View>
      <Text style={styles.value}>{item.humidity} %</Text>

      <View style={styles.row}>
        <FontAwesome5 name="traffic-light" size={20} color="#333" />
        <Text style={styles.label}>Object Detected:</Text>
      </View>
      <Text style={styles.value}>{item.objectDetected}</Text>

      <View style={styles.row}>
        <FontAwesome5 name="ruler" size={20} color="#333" />
        <Text style={styles.label}>Object Distance:</Text>
      </View>
      <Text style={styles.value}>{item.objectDistance} cm</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  list: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  value: {
    fontSize: 16,
  },
});

export default JsonDataScreen;
