/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from './Button';

const Error = ({route, navigation}: any) => {
  const {res} = route?.params;
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          //   flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
          borderWidth: 2,
        }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: 'white',
            padding: 20,
            borderRadius: 20,
          }}>
          <Text style={{fontSize: 20, color: 'red'}}>{res}</Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            width: 170,
          }}>
          <Button
            text="Login"
            onPress={() => navigation.navigate('Login')}
            style={{
              backgroundColor: '#008000',
              padding: 15,
              borderRadius: 15,
              alignItems: 'center',
              marginBottom: 10,
            }}
          />
          <Button
            text="Register"
            onPress={() => navigation.navigate('Register')}
            style={{
              backgroundColor: 'grey',
              padding: 15,
              borderRadius: 15,
              alignItems: 'center',
              marginBottom: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Error;
