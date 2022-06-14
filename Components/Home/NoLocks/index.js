import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { styles } from '../style';

const Index = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={[
          styles.locksInnerContainer,
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          },
        ]}
        onPress={() => navigation.navigate(`NewLock`)}
      >
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 24,
            color: '#F7F7F7',
          }}
        >
          No locks are registereed to this user, create one now!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
