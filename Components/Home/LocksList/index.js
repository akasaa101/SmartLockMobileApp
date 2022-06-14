import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-elements';
import { styles } from '../style';

const Index = ({ navigation, data }) => {
  return (
    <>
      <View style={styles.locksContainer}>
        <Text style={styles.locksHeader}>Registered Locks</Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        {data.map((item) => {
          return (
            <TouchableOpacity
              style={styles.locksInnerContainer}
              key={item.id}
              onPress={() => navigation.navigate(`lock${item.id}`)}
            >
              <Text style={styles.lockTitle}>{item.name}</Text>
              <Text style={styles.lockStatus}>
                {item.status === 'active' ? (
                  <Ionicons name="lock-open" color="#06d6a0" size={20} />
                ) : (
                  <Ionicons name="lock-closed" color="#ef476f" size={20} />
                )}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Index;
