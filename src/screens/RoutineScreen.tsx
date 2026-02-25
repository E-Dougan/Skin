import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RoutineScreen: React.FC = () => {
  const navigation = useNavigation();

  const routineSteps = [
    {id: '1', step: 'Cleanse', time: 'Morning & Evening', description: 'Remove dirt and impurities'},
    {id: '2', step: 'Tone', time: 'Morning & Evening', description: 'Balance skin pH'},
    {id: '3', step: 'Treat', time: 'Evening', description: 'Apply targeted treatments'},
    {id: '4', step: 'Moisturize', time: 'Morning & Evening', description: 'Hydrate and protect'},
    {id: '5', step: 'Protect', time: 'Morning', description: 'Apply sunscreen'},
  ];

  const renderStep = ({item}: {item: {id: string; step: string; time: string; description: string}}) => (
    <View style={styles.stepItem}>
      <Text style={styles.stepName}>{item.step}</Text>
      <Text style={styles.stepTime}>{item.time}</Text>
      <Text style={styles.stepDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Skincare Routine</Text>
      <Text style={styles.description}>
        Follow these steps for healthy, glowing skin.
      </Text>

      <FlatList
        data={routineSteps}
        renderItem={renderStep}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  stepItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  stepTime: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default RoutineScreen;