import 'react-native';
import React from 'react';
import Login from '../src/screens/Login';

describe('Login', () => {
  it('should render successfully', () => {
    const {container} = render(<Login />);
    expect(container).toBeTruthy();
  });
});
