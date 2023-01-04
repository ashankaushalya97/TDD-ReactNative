import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';
import App from '../App';

// function add(a:number, b:number){
//     return a+b;
// }

// describe('App',()=>{
//     test('first test',()=>{
//         expect(add(2,2)).toBe(4);
//     })
// })

describe('App',()=>{
    test('Should render correctly',()=>{
        // renderer.create(<App/>);
        const wrapper = render(<App/>);
        wrapper.getByTestId('app')
    })
})