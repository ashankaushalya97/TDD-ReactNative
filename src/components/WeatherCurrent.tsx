import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import LocationService from '../services/LocationService';
import Button from './Button';

const WeatherCurrent = () => {
  const navigation = useNavigation();

  const handleFethcWaether = useCallback(async () => {
    const position = await LocationService.getCurrentPosition();
    navigation.navigate('Weather' as never, position as never);
  }, [navigation]);

  return (
    <Button testID="weather-current" label="" onPress={handleFethcWaether} />
  )

};

export default WeatherCurrent;
