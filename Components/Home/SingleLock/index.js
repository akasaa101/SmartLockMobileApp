import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input, Text } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';
import { styles } from './style';
// import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

// NfcManager.start();

const Index = ({ navigation, item }) => {
  const [isLocked, setIsLocked] = useState(item.status);
  const [failure, setFailure] = useState(false);
  const [success, setSuccess] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    wait(2000).then(() => {
      setFailure(false);
      setSuccess(false);
    });
  }, []);

  // Lock and Unlock the Lock
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      const fetchData = await fetch(
        `https://smart-lock-api-bau.herokuapp.com/authorization/check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: JSON.parse(value)?.id,
            lock: item.id,
          }),
        }
      );
      const response = await fetchData.json();
      const result = await response;
      if (result.status === 'success') {
        setSuccess(true);
        onRefresh();
      } else {
        setIsLocked(isLocked === 'active' ? 'passive' : 'active');
        setFailure(true);
        onRefresh();
      }
      // if (result.status === 'success') {
      //   let NFCresult = false;
      //   NfcManager.start();
      //   try {
      //     NfcManager.requestTechnology(NfcTech.Ndef);
      //     const bytes = Ndef.encodeMessage([Ndef.textRecord(result.token)]);
      //     if (bytes) {
      //       await NfcManager.ndefHandler.writeNdefMessage(bytes);
      //       NFCresult = true;
      //     }
      //   } catch (err) {
      //     console.warn(err);
      //   } finally {
      //     NfcManager.cancelTechnologyRequest();
      //   }
      // }
      if (result.status !== 'success') {
        alert(result.message);
      }
    })();
  }, [isLocked]);

  const handleDelete = async () => {
    // Delete the lock
    const value = await AsyncStorage.getItem('user');
    const fetchData = await fetch(
      `https://smart-lock-api-bau.herokuapp.com/locks/${item.id}/removeUser`,
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
    const response = await fetchData.json();
    const result = await response;
    if (result.status === 'success') navigation.navigate('Home');
    else alert(result.message);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: '80%' }}>
            <Input
              placeholder={item?.name}
              type="text"
              value={item?.name}
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
        {success && (
          <TouchableOpacity
            style={[
              styles.deleteContainer,
              { backgroundColor: '#06d6a0', width: '100%', borderRadius: '16' },
            ]}
          >
            <Text style={styles.deleteTitle}>
              Successfully {isLocked === 'active' ? 'Unlocked' : 'Locked'}
            </Text>
          </TouchableOpacity>
        )}
        {failure && (
          <TouchableOpacity
            style={
              s[(styles.deleteContainer, { width: '100%', borderRadius: '16' })]
            }
          >
            <Text style={styles.deleteTitle}>
              {isLocked === 'active' ? 'Unlocking' : 'Locking'} Failed
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.lockContainer}
          onPress={() =>
            setIsLocked(isLocked === 'active' ? 'passive' : 'active')
          }
        >
          {isLocked === 'active' ? (
            <Ionicons name="lock-open" color="#06d6a0" size={150} />
          ) : (
            <Ionicons name="lock-closed" color="#ef476f" size={150} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteContainer} onPress={handleDelete}>
          <Text style={styles.deleteTitle}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Index;
