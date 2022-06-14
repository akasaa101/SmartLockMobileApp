import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import { AsyncStorage } from 'react-native';
import { styles } from './style';

const Index = ({ navigation, setUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const fetchData = await fetch(
      'https://smart-lock-api-bau.herokuapp.com/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const response = await fetchData.json();
    const result = await response;
    if (result.user) {
      try {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            ...result.user,
            token: result.token,
          })
        );
      } catch (error) {}
      await setUser({
        ...result.user,
        token: result.token,
      });
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Continue Progressing</Text>
          <Text style={[styles.subText, { marginBottom: 30 }]}>
            Log in to your account
          </Text>
          <Text style={styles.text}>Email</Text>
          <Input
            placeholder="John.doe@gmail.com"
            type="email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <EmailIcon
                name="email-check-outline"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          <Text style={styles.text}>Password</Text>
          <Input
            placeholder="******************"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <PasswordIcon
                name="key"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          {isLoading ? (
            <Button
              type="solid"
              color="#3D1273"
              radius="16"
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              loading
            />
          ) : (
            <Button
              type="solid"
              radius="16"
              title="Log in"
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              onPress={handleClick}
            />
          )}
          <Text
            style={[styles.subText, { marginVertical: 6, alignSelf: 'center' }]}
          >
            or
          </Text>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Text>
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Index;
