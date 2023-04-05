/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {USER} from '../services/UserService';

const DashboardScreen = ({route}: any) => {
  const [users, setUsers] = useState<USER[] | any[]>([]);
  const {token} = route.params;

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

  return (
    <View>
      <Image
        source={{uri: token.image}}
        resizeMode="cover"
        style={{
          width: 200,
          height: 200,
          borderRadius: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      {users?.map(items => {
        if (items.name === token.name) {
          return (
            <Image
              key={items.id}
              source={{uri: items.image}}
              resizeMode="cover"
              style={{
                width: 200,
                height: 200,
                borderRadius: 15,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          );
        }
      })}
    </View>
  );
};

export default DashboardScreen;
