import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import UserIcon from 'react-native-vector-icons/AntDesign';
import PhoneIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import { AsyncStorage } from 'react-native';
import { styles } from './style';

const Index = ({ navigation, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    // Handle Sign Up then saving the user onto firestore functionality
    setIsLoading(true);
    const fetchData = await fetch(
      'https://smart-lock-api-bau.herokuapp.com/user/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const response = await fetchData.json();
    const result = await response;
    if (result.message === 'User created') {
      const userData = await {
        id: result.user._id,
        name: result.user.name,
        surname: result.user.surname,
        phone: result.user.phone,
        email: result.user.email,
      };
      try {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({ ...userData, token: result.user._id })
        );
        await setUser({ ...userData, token: result.user._id });
      } catch (e) {
        alert(e);
      }
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Get Started</Text>
          <Text style={[styles.subText, { marginBottom: 30 }]}>
            Let's create your account
          </Text>

          <Text style={styles.text}>Name</Text>
          <Input
            placeholder="John"
            type="text"
            value={formData.name}
            onChangeText={(e) => setFormData({ ...formData, name: e })}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <UserIcon
                name="user"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          <Text style={styles.text}>Surname</Text>
          <Input
            placeholder="Doe"
            type="text"
            value={formData.surname}
            onChangeText={(e) => setFormData({ ...formData, surname: e })}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <UserIcon
                name="user"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          <Text style={styles.text}>Phone Number</Text>
          <Input
            placeholder="500 500 22 22"
            type="number"
            value={formData.phone}
            onChangeText={(e) => setFormData({ ...formData, phone: e })}
            style={{ color: '#FFF' }}
            inputContainerStyle={[styles.input]}
            leftIcon={
              <PhoneIcon
                name="phone"
                color="#00F0FF"
                style={{ marginRight: 20, fontSize: 22 }}
              />
            }
          />
          <Text style={styles.text}>Email</Text>
          <Input
            placeholder="John.doe@gmail.com"
            type="email"
            value={formData.email}
            onChangeText={(e) => setFormData({ ...formData, email: e })}
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
            value={formData.password}
            onChangeText={(e) => setFormData({ ...formData, password: e })}
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
              title="Get Started"
              buttonStyle={{ backgroundColor: '#3D1273' }}
              containerStyle={styles.button}
              onPress={handleClick}
            />
          )}
          <Text
            style={[styles.subText, { marginTop: 14, alignSelf: 'center' }]}
          >
            Already have an account?{' '}
            <Text
              style={styles.signup}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </Text>
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Index;
