import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import WeatherCurrent from '../../components/WeatherCurrent';
import { View } from 'react-native';
import WeatherCoordinates from '../../components/WeatherCoordinates';

jest.mock('../../components/WeatherCoordinates',() => jest.fn().mockReturnValue(null));

jest.mock('../../components/WeatherCurrent',() => jest.fn().mockReturnValue(null));

describe('HomeScreen',()=>{
    test('Should render correctly',()=>{
        const wrapper = render(<HomeScreen/>);
        wrapper.getByTestId('home-screen')
    })

    describe('Title section', () => {
        // beforeEach(() => {
        //     jest.useFakeTimers('modern');
        //     jest.setSystemTime(946684800000) // Saturday, 1st Jan 2000 00:00 UTC
        // })

        afterEach(()=> {
            jest.useRealTimers();
        })

        // test('Should contain current date', () => {
        //     const wrapper = render(<HomeScreen/>);
        //     // wrapper.getByText('Jan 01, 2000')
        //     wrapper.getByText('Dec 26, 2022')
        // })

        // test('Should contain current day', () => {
        //     const wrapper = render(<HomeScreen/>);
        //     wrapper.getByText('Monday')
        // })
    })
})

test('Should contain a section to get current weather', () => {
    (WeatherCurrent as jest.Mock).mockReturnValue(
        <View testID='mock-weather-current' />
    )

    const wrapper = render(<HomeScreen/>);
    wrapper.getByTestId('mock-weather-current');
})

test('Should contain a divider', () => {
    const wrapper = render(<HomeScreen/>);
    wrapper.getByTestId('home-screen-divider');
})

test('Should contain a section to get weather at give lat and long', () => {
    (WeatherCoordinates as jest.Mock).mockReturnValue(
        <View testID='mock-weather-coordinates' />
    )

    const wrapper = render(<HomeScreen/>);
    wrapper.getByTestId('mock-weather-coordinates');
})