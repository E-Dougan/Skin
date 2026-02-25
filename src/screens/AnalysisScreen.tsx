import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/MainNavigator';
import { analysisAPI, AnalysisResult } from '../services/api';

type AnalysisScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Analysis'>;

const AnalysisScreen: React.FC = () => {
  const navigation = useNavigation<AnalysisScreenNavigationProp>();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageAnalysis = async () => {
    // In a real app, this would open camera or image picker
    Alert.alert('Image Analysis', 'Camera integration would be implemented here');
    // For demo, simulate analysis
    setAnalyzing(true);
    try {
      // Mock image file - in real app, get from camera/gallery
      const mockImageFile = new File([''], 'mock.jpg', { type: 'image/jpeg' });
      const response = await analysisAPI.analyzeImage(mockImageFile);
      setResult(response.data);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleQuestionnaire = () => {
    // Navigate to questionnaire screen or show modal
    Alert.alert('Questionnaire', 'Skin type questionnaire would be implemented here');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skin Analysis</Text>
      <Text style={styles.description}>
        Get personalized insights about your skin type and concerns.
      </Text>

      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Analysis Results</Text>
          <Text style={styles.resultText}>Skin Type: {result.skin_type}</Text>
          <Text style={styles.resultText}>Concerns: {result.concerns.join(', ')}</Text>
          <Text style={styles.resultText}>Recommendations:</Text>
          {result.recommendations.map((rec, index) => (
            <Text key={index} style={styles.recommendation}>• {rec}</Text>
          ))}
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, analyzing && styles.buttonDisabled]}
            onPress={handleImageAnalysis}
            disabled={analyzing}>
            <Text style={styles.buttonText}>
              {analyzing ? 'Analyzing...' : 'Take Photo'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleQuestionnaire}>
            <Text style={styles.buttonText}>Answer Questions</Text>
          </TouchableOpacity>
        </>
      )}

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    marginBottom: 40,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },Disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  recommendation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginLeft: 10
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default AnalysisScreen;