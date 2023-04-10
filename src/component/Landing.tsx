/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Icons from 'react-native-vector-icons/Ionicons';

import {landing} from './images';
import { Button} from './Button';

const Landing = ({navigation}: any) => {
  return (
    <ImageBackground source={landing} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          padding: 10,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 35, fontWeight: '900', color: 'cyan'}}>
            Welcome to the new world
          </Text>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'lightcyan'}}>
            Explore the Diversity herewith and in all
          </Text>
          <Text style={{fontSize: 25, fontWeight: '500', color: 'lightcyan'}}>
            Enjoy your Experience.
          </Text>
        </View>
        <Animatable.View
          animation={'bounce'}
          easing="ease-in-out"
          iterationCount={'infinite'}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 10,
            alignItems: 'center',
            marginBottom: 373,
          }}>
          <Icons name={'star-sharp'} color={'gold'} size={130} />
        </Animatable.View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Button
          text="LOGIN"
          // view={{
          //   width: 176,
          //   height: 70,
          //   display: 'flex',
          //   flexDirection: 'row',
          //   alignItems: 'center',
          //   justifyContent: 'center',
          // }}
          onPress={() => navigation.navigate('Login')}
          style={{
            padding: 15,
            width: '49.7%',
            height: 70,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#C2E9AB',
            borderTopRightRadius: 35,
          }}
        />
        <Button
          text="REGISTER"
          onPress={() => navigation.navigate('Register')}
          style={{
            padding: 15,
            width: '49.7%',
            height: 70,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#48C8DD',
            borderBottomLeftRadius: 35,
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Landing;
