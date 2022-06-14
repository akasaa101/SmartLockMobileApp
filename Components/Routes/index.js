import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AsyncStorage } from 'react-native';

// Main Components
import Home from '../Home';
import SingleLock from '../Home/SingleLock';
import NewLock from '../Home/NewLock';

// User Credentials Components
import Register from '../User/Register';
import Login from '../User/Login';

const Stack = createNativeStackNavigator();

const Index = ({ navigation }) => {
  const [user, setUser] = useState();
  const [locksList, setLocksList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
        navigation.navigate('Home');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (user) {
        const fetchData = await fetch(
          `https://smart-lock-api-bau.herokuapp.com/locks`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const response = await fetchData.json();
        const result = await response;
        await setLocksList(
          result.doors.filter(({ users }) => users.includes(user.id))
        );
      }
    })();
  }, [user, locksList, refreshing]);

  // This was implmented for testing purposes only
  // useEffect(() => {
  //   AsyncStorage.removeItem('user');
  // }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(61, 18, 115, 0.8)',
      card: 'rgba(61, 18, 115, 1)',
      background: 'transparent',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar backgroundColor="#10A9B0" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user && (
          <Stack.Screen name="Home">
            {(props) => (
              <Home
                {...props}
                user={user}
                setUser={setUser}
                refreshing={refreshing}
                setRefreshing={setRefreshing}
                locksList={locksList}
              />
            )}
          </Stack.Screen>
        )}
        {user &&
          locksList.length !== 0 &&
          Array.isArray(locksList) &&
          locksList?.map((item) => {
            return (
              <Stack.Screen key={`lock${item?.id}`} name={`lock${item?.id}`}>
                {(props) => <SingleLock {...props} item={item} user={user} />}
              </Stack.Screen>
            );
          })}
        {user && (
          <Stack.Screen name="NewLock">
            {(props) => <NewLock {...props} setRefreshing={setRefreshing} />}
          </Stack.Screen>
        )}

        {!user && (
          <Stack.Screen name="Login">
            {(props) => <Login {...props} setUser={setUser} />}
          </Stack.Screen>
        )}
        {!user && (
          <Stack.Screen name="Register">
            {(props) => <Register {...props} setUser={setUser} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
console.disableYellowBox = true;
