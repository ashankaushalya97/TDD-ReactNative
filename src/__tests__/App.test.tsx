import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import App from '../App';

import AppNavigator from '../screens';
import { View } from 'react-native';

jest.mock('../screens', () => jest.fn())
// function add(a:number, b:number){
//     return a+b;
// }

// describe('App',()=>{
//     test('first test',()=>{
//         expect(add(2,2)).toBe(4);
//     })
// })

describe('App',()=>{
    // test('Should render correctly',()=>{
    //     // renderer.create(<App/>);
    //     const wrapper = render(<App/>);
    //     wrapper.getByTestId('app')
    // })

    test('Should render routes', () => {
        (AppNavigator as jest.Mock).mockReturnValueOnce(<View testID='mock-routes'  />)

        const wrapper = render(<App/>)
        wrapper.getByTestId('mock-routes')
    })

})