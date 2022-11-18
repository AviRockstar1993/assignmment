import React from 'react';
import {View, Text} from 'react-native';

export const TextComponent = ({text}) => {
  return (
    <View>
      <Text
        style={{
          paddingLeft: '2%',
          color: 'black',
          marginLeft: 10,
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </View>
  );
};
