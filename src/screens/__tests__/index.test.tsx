import React, { useEffect } from 'react';
import {render, waitFor} from '@testing-library/react-native';
import { View } from 'react-native';
import AppNavigator from '..';
import HomeScreen from '../HomeScreen';
import { useNavigation } from '@react-navigation/native';
import WeatherScreen from '../WeatherScreen';

jest.mock('../HomeScreen', () => jest.fn());
jest.mock('../WeatherScreen', () => jest.fn());

describe('AppNavigator', () => {
    test('Should render Homescreen by default', async () => {
        (HomeScreen as jest.Mock).mockReturnValueOnce(<View testID="mock-home-screen" />)
        const wrapper  = render(<AppNavigator/>)

        await waitFor(() => {
          wrapper.getByTestId('mock-home-screen')  
        })
    })

    test('Should render WeatherScreen on "Weather" route', async () => {
        (HomeScreen as jest.Mock).mockImplementationOnce(() => {

            const navigation = useNavigation();

            useEffect(() => {
                navigation.navigate('Weather')
            },[navigation])

            return null;
        });

        (WeatherScreen as jest.Mock).mockReturnValueOnce(<View testID='mock-weather-screen'  />)

        const wrapper = render (<AppNavigator/>)

        await waitFor(() => {
            wrapper.getByTestId('mock-weather-screen')
        })
    })
})