/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Button} from './Button';
import {USER} from '../services/UserService';

export const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const default_details: USER = {
    email: email,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatzz-338a2.appspot.com/o/rn_image_picker_lib_temp_b148caed-3ba3-4093-8164-d0c742e3e07a.jpg?alt=media&token=1e2538d3-fef5-476c-9bee-ba07a184b4e8',
    name: 'Fadeke ',
    password: password,
    phonenumber: '07038968337',
  };

  const signIn = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Dashboard', {token: default_details});
        });
    } catch (error: any) {
      console.log(typeof error.message);
      if (error) {
        navigation.navigate('Error', {res: error.message});
      }
    }
  };

  return (
    <View
      style={{
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#654EE8',
      }}>
      <View
        style={{
          padding: 10,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          marginTop: 250,
        }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            marginBottom: 10,
            borderWidth: 0,
            borderColor: 'gray',
            paddingHorizontal: 10,
            borderRadius: 15,
            padding: 15,
            backgroundColor: '#7D67F7',
            color: 'black',
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            marginBottom: 10,
            padding: 15,
            borderWidth: 0,
            borderColor: 'gray',
            paddingHorizontal: 10,
            borderRadius: 15,
            backgroundColor: '#7D67F7',
          }}
        />
        <Button
          text={'Sign In'}
          onPress={signIn}
          style={{
            backgroundColor: '#B4BAFF',
            padding: 15,
            borderRadius: 15,
            alignItems: 'center',
            marginBottom: 10,
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontFamily: 'San-serif', fontSize: 22}}>
            New to this app
          </Text>
          <Button
            text={'Sign up'}
            onPress={() => navigation.navigate('Register')}
            style={{
              backgroundColor: '#7D67F7',
              padding: 15,
              borderRadius: 15,
              alignItems: 'center',
              borderBottom: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};
