import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Input, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';
import { styles } from './style';

const Index = ({ navigation, setRefreshing }) => {
  const [name, setName] = useState('');
  const [isLocked, setIsLocked] = useState(true);

  const handleSave = async () => {
    // Handle Adding the lock
    const value = await AsyncStorage.getItem('user');
    const addLock = await fetch(
      `https://smart-lock-api-bau.herokuapp.com/locks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      }
    );
    const addLockResponse = await addLock.json();
    const addLockResult = await addLockResponse;
    if (addLockResult.status === 'success') {
      const addToUser = await fetch(
        `https://smart-lock-api-bau.herokuapp.com/locks/${addLockResult.door.id}/addUser`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: JSON.parse(value).id,
          }),
        }
      );
      const addToUserResponse = await addToUser.json();
      const addToUserResult = await addToUserResponse;
      if (addToUserResult.status === 'success') {
        setRefreshing(true);
        navigation.navigate('Home');
      } else alert(addToUserResult.message);
    } else alert(addLockResult.message);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: '80%' }}>
            <Input
              placeholder="Add New Lock"
              type="text"
              value="Add New Lock"
              style={styles.font}
              disabled={true}
              containerStyle={{ backgroundColor: 'transparent' }}
              inputStyle={{ backgroundColor: 'transparent' }}
              inputContainerStyle={styles.input}
              leftIcon={
                <AntDesign
                  name="arrowleft"
                  color="#F7F7F7"
                  size={20}
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.goBack()}
                />
              }
            />
          </View>
        </View>
        <Input
          placeholder="Smart Lock Name"
          type="text"
          value={name}
          onChangeText={(e) => setName(e)}
          style={{ color: '#FFF' }}
          inputContainerStyle={[styles.nameInput]}
        />
        <TouchableOpacity
          style={styles.lockContainer}
          onPress={() => setIsLocked(!isLocked)}
        >
          {isLocked ? (
            <Ionicons name="lock-closed" color="#ef476f" size={150} />
          ) : (
            <Ionicons name="lock-open" color="#06d6a0" size={150} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveContainer} onPress={handleSave}>
          <Text style={styles.saveTitle}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Index;
