import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getLists } from '../../Api'; // Cambio aquí

const JsonFormScreen = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchListData();
  }, []);

  const fetchListData = async () => {
    try {
      const response = await getLists(); // Cambio aquí
      setListData(response); // Asigna los datos de la lista al estado
    } catch (error) {
      console.error('Error fetching list data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Temperature: {item.temperature}</Text>
      <Text style={styles.text}>Humidity: {item.humidity}</Text>
      <Text style={styles.text}>Object Detected: {item.objectDetected}</Text>
      <Text style={styles.text}>Object Distance: {item.objectDistance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default JsonFormScreen;
