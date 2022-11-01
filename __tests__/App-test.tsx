/**
 * @format
 */

import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import React from 'react';
import App from '../App.tsx';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

describe('App Test1', () => {
  test('test caseApp 1', () => {
    const componentone = shallow(<App />);
    console.log(componentone.debug(), 'RESTLLLT');
    expect(componentone).toMatchSnapshot();
  });
});
