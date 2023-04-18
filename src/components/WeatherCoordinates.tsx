import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../constants';
import Button from './Button';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type FormValues = {
  latitude: string;
  longitude: string;
};

const WeatherCoordinates = () => {
  const navigation = useNavigation();
  const form = useForm<FormValues>({
    resolver: yupResolver(validationScheme),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(values => {
    navigation.navigate('Weather', values);
  });

  return (
    <View testID="weather-coordinates">
      <View style={styles.inputs}>
        <Controller
          control={form.control}
          render={({onChange, ...p}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-latitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder="lat"
              placeholderTextColor={Colors.GREY}
            />
          )}
          name="latitude"
        />
        {form.errors.latitude && (
          <Text style={styles.error}>Latitude must be a valid number</Text>
        )}
        <Controller
          control={form.control}
          render={({onChange, ...p}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-longitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder="Long"
              placeholderTextColor={Colors.GREY}
            />
          )}
          name="longitude"
        />
        {form.errors.longitude && (
          <Text style={styles.error}>Longitude must be a valid number</Text>
        )}
      </View>
      <Button onPress={handleSubmit} label="find" />
    </View>
  );
};

const defaultValues: FormValues = {
  latitude: '',
  longitude: '',
};

const validationScheme = yup.object().shape({
  latitude: yup.number().min(-90).max(90),
  longitude: yup.number().min(-1800).max(180),
});

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GREY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

export default WeatherCoordinates;
