/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList} from 'react-native';
import {USER} from '../services/UserService';
import {firebase} from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {anonymous, bank, chat, game, learn} from './images';
import Card from './Card';

export type Service = {
  key: number;
  name: string;
  image: any;
  onPress: () => void;
  disable: boolean;
};
const Dashboard = (token: any) => {
  const [users, setUsers] = useState<USER[] | any[]>([]);
  const [user, setUser] = useState<USER>(token.token);
  const services: Service[] = [
    {
      key: 1,
      name: 'Socialize',
      image: chat,
      onPress: () => {
        token.navigation.navigate('Users', {res: user, data: users});
      },
      disable: false,
    },
    {
      key: 2,
      name: 'Learn',
      image: learn,
      onPress: () => {
        token.navigation.navigate('Learn', {res: user});
      },
      disable: true,
    },
    {
      key: 3,
      name: 'Wallet',
      image: bank,
      onPress: () => {
        token.navigation.navigate('Bank', {res: user});
      },
      disable: true,
    },
    {
      key: 4,
      name: 'Games',
      image: game,
      onPress: () => {
        token.navigation.navigate('Game', {res: user});
      },
      disable: true,
    },
    {
      key: 5,
      name: 'Anonymous',
      image: anonymous,
      onPress: () => {
        token.navigation.navigate('Anonymous', {res: user});
      },
      disable: true,
    },
  ];

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('User')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (!querySnapshot.empty) {
          setUsers(data);
        }
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token !== null || token !== undefined) {
      const [response] = users.filter(item => item.email === token.token.email);
      console.log(response);
      setUser(response);
    }
  }, [users, token]);

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      {/* Top part */}
      <View
        style={{
          height: 210,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: 200,
            display: 'flex',
            padding: 3,
            backgroundColor: '#B4BAFF',
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
          }}>
          <View
            style={{
              padding: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#654EE8',
                }}>
                Be-nice
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 20, color: '#E6EDF7'}}>
                Welcome
                {user?.name.length >= 10
                  ? user?.name.slice(0, 10) + '...'
                  : user?.name}
              </Text>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: '#654EE8',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Icon name={'star'} color={'black'} />
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: 3,
              flex: 1,
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: 3,
                padding: 7,
                borderRadius: 25,
                backgroundColor: '#654EE8',
              }}>
              <Image
                source={{uri: user?.image}}
                resizeMode="cover"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Down part */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#654EE8',
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        }}>
        <View
          style={{
            padding: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 80,
              backgroundColor: '#7D67F7',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>
              Twitter Update
            </Text>
          </View>
          <View
            style={{
              width: 100,
              height: 80,
              backgroundColor: '#7D67F7',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>
              Twitter Update
            </Text>
          </View>
          <View
            style={{
              width: 100,
              height: 80,
              backgroundColor: '#7D67F7',
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>
              Twitter Update
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: '#E6EDF7',
            borderTopRightRadius: 35,
            borderTopLeftRadius: 35,
          }}>
          <FlatList
            data={services}
            renderItem={({item}) => <Card {...item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
