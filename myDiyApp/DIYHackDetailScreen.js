import React, {useEffect,useState} from 'react';
import { View, Text, FlatList, StyleSheet, Image} from 'react-native';

const DiyHackDetailScreen = ({ route }) => {
  const { diyHack } = route.params;
  const [materialRequired, setMaterialRequired] = useState([]);

  useEffect(() => {
    const fetchDiyHacks = async () => {
      setMaterialRequired(diyHack.materialsAsArr);
    };

    fetchDiyHacks();
  }, []);

  return (
    <View style={{ padding: 20}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {diyHack.title}
      </Text>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
        Materials Required:
      </Text>
      <FlatList
        data={materialRequired}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16, marginLeft: 10 }}>• {item}</Text>
        )}
      />
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
        Instructions:
      </Text>
      <Text style={{ fontSize: 16, marginTop: 5 }}>
        {diyHack.instructions}
      </Text>
      
      {diyHack.imageUrl && (
        <Image 
          source={{ uri: diyHack.imageUrl }} 
          style={styles.uploadedImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({  
  uploadedImage: {
    width: '60%',
    // resizeMode: 'cover',    
    aspectRatio: 1,        // Maintain a 1:1 aspect ratio; adjust as needed
    height: undefined, 
    margin:'.5cm'
  },})
export default DiyHackDetailScreen;

