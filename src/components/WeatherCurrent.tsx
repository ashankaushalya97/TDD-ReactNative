import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import LocationService from '../services/LocationService';
import Button from './Button';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants';

const WeatherCurrent = () => {
  const [error,setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('loading ++++++++++++++++++++++ ',loading);
    
  },[loading])

  const handleFethcWaether = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const position = await LocationService.getCurrentPosition();
      // navigation.navigate('Weather' as never, position as never);
      navigation.navigate('Weather', position);
    } catch (e) {
      setError(true)
    }
    setLoading(false);
  }, [navigation]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFethcWaether}
      loading={loading}
      style={error && styles.error}
    />
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor:Colors.ERROR,
    borderWidth:1,
    borderRadius:10,
  }
})

export default WeatherCurrent;
