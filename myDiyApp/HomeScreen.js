import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { db } from './firebase';
import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [diyHacks, setDiyHacks] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

  // Fetch DIY hacks from Firestore database
  const fetchDiyHacks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "diyHacks"));
      const hacks = [];
      querySnapshot.forEach((doc) => {
        const hack = doc.data();
        hack.id = doc.id;
        // Handle both old format (materialsRequired string) and new format (materialsAsArr array)
        if (!hack.materialsAsArr && hack.materialsRequired) {
          // Old format: convert string to array
          hack.materialsAsArr = hack.materialsRequired.split(',').map(item => item.trim());
        } else if (!hack.materialsAsArr) {
          // No materials data
          hack.materialsAsArr = [];
        }
        hacks.push(hack);
      });
      setDiyHacks(hacks);
    } catch (error) {
      console.error('Error fetching DIY hacks:', error);
      alert('Failed to load DIY hacks. Please try again.');
    }
  };

  // Fetch data when screen loads
  useEffect(() => {
    fetchDiyHacks();
  }, []);

  // Refetch data when screen comes into focus (after adding new hack)
  useFocusEffect(
    useCallback(() => {
      fetchDiyHacks();
    }, [])
  );
  
  const addDIYHack = async ()=>{
    navigation.navigate('AddDiyHack')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.pressableContainer}>
      <Text style={styles.generalText}>Checkout the DIY Hacks</Text>
    <Pressable onPress={addDIYHack} >
      <Ionicons style={styles.icon} 
                name="add" 
                size={24} 
                color="blue" 
          />
      </Pressable>
      </View>
      <View style={styles.diyHacksList}>
      <FlatList
        data={diyHacks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DiyHackDetail', { diyHack: item })}>
            <Text style={styles.textWithBorder}>- {item.title}</Text>            
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textWithBorder: {
    fontSize: 20,
    color: 'purple',
    padding: 10,
    borderWidth: 2,
    borderColor: '#001a66',
    borderRadius: 5,
    margin: 5
  },
  pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: '1cm',
  },
  diyHacksList: {
    flexDirection: 'column',
    width: '80%',
    alignItems: 'flex-start'
  },
  button: {
    backgroundColor: '#001a66',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  generalText: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 10,
    padding: 10
  },
  icon:{
    margin:3, 
    borderWidth:3, 
    borderRadius:25, 
    borderColor:'#001a66', 
    padding:7},
});

export default HomeScreen;

