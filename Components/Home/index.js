import React, { useEffect, useState } from 'react';
import {
  View,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LocksList from './LocksList';
import NoLocks from './NoLocks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-elements';
import { styles } from './style';
import { AsyncStorage } from 'react-native';

const Index = ({
  navigation,
  user,
  setUser,
  locksList,
  refreshing,
  setRefreshing,
}) => {
  const [data, setData] = useState(locksList);

  useEffect(() => {
    setData(locksList);
  }, [locksList]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(600).then(() => setRefreshing(false));
  }, []);

  const handleLogout = async () => {
    setUser(false);
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={[styles.title, { marginLeft: 50 }]}>
          {user?.name} {user?.surname}
        </Text>

        {data.length !== 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('NewLock')}
            style={[styles.itemButton]}
          >
            <Ionicons name="ios-add-circle-outline" size={40} color="#06d6a0" />
          </TouchableOpacity>
        )}

        {data.length !== 0 ? (
          <LocksList data={data} navigation={navigation} />
        ) : (
          <NoLocks navigation={navigation} />
        )}
        <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
          <Text style={styles.logoutTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Index;
