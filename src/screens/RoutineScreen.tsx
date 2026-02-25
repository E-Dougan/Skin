import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import { routinesAPI, Routine } from '../services/api';

type RoutineScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Routine'>;

const RoutineScreen: React.FC = () => {
  const navigation = useNavigation<RoutineScreenNavigationProp>();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const response = await routinesAPI.getAll();
      setRoutines(response.data.routines);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load routines');
    } finally {
      setLoading(false);
    }
  };

  const defaultSteps = [
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

  const renderRoutine = ({item}: {item: Routine}) => (
    <View style={styles.routineItem}>
      <Text style={styles.routineName}>{item.name}</Text>
      <Text style={styles.routineFrequency}>{item.frequency}</Text>
      <Text style={styles.routineSteps}>
        {Array.isArray(item.steps) ? item.steps.length : 0} steps
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading routines...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Skincare Routine</Text>
      <Text style={styles.description}>
        Follow these steps for healthy, glowing skin.
      </Text>

      {routines.length > 0 ? (
        <FlatList
          data={routines}
          renderItem={renderRoutine}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      ) : (
        <FlatList
          data={defaultSteps}
          renderItem={renderStep}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => Alert.alert('Create Routine', 'Routine creation feature coming soon!')}>
        <Text style={styles.createButtonText}>Create Custom Routine</Text>
      </TouchableOpacity>

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
  routineItem: {
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
  routineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  routineFrequency: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  routineSteps: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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