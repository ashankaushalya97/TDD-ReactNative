import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import WeatherCoordinates from '../WeatherCoordinates';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    // useNavigation: jest.fn(),
    useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  };
});

describe('WeatherCoordinates', () => {
  test('Should render correctly', () => {
    const wrapper = render(<WeatherCoordinates />);
    wrapper.getByTestId('weather-coordinates');
  });

  test('Should navigate to weather screen with given coordinates when valid form is submit', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    const wrapper = render(<WeatherCoordinates />);
    const fields = {
      latitude: wrapper.getByTestId('weather-coordinates-latitude'),
      longitude: wrapper.getByTestId('weather-coordinates-longitude'),
    };

    fireEvent.changeText(fields.latitude, '0');
    fireEvent.changeText(fields.longitude, '0');

    const button = wrapper.getByTestId('button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Latitude field', () => {
    test('SHould not show error when value is lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '-90');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '90');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is lower than the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '-91');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is higher than the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, '91');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is not a number', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-latitude');
      fireEvent.changeText(field, 'a');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });
  });

  describe('Longitude field', () => {
    test('SHould not show error when value is lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '-180');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '180');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is lower than the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '-181');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is higher than the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, '181');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    test('SHould not show error when value is not a number', () => {
      const wrapper = render(<WeatherCoordinates />);
      const field = wrapper.getByTestId('weather-coordinates-longitude');
      fireEvent.changeText(field, 'a');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });
  });
});
