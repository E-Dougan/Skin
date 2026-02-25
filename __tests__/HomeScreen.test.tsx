import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Welcome to Skin')).toBeTruthy();
  });

  it('shows login prompt when not authenticated', () => {
    const {getByText} = render(<HomeScreen />);
    expect(getByText('Please log in to access all features')).toBeTruthy();
  });
});