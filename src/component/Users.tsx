/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ImageBackground,
} from 'react-native';
import {List} from './Card';
import Icons from 'react-native-vector-icons/Ionicons';
import {night} from './images';

const Users = (details: any) => {
  const [allUsers, setUsers] = useState<any[]>([]);
  const todo = ['Chat', 'Status', 'Group'];
  const [selector, setSelector] = useState<string>('Chat');

  useEffect(() => {
    if (details !== null || details !== undefined) {
      setUsers(details.data.map((items: any) => items));
    }
  }, [details]);

  return (
    <ImageBackground source={night} style={styles.container}>
      <View style={styles.top}>
        <View style={styles.tops}>
          <Text style={styles.title}>Socialize</Text>
          <View style={styles.topz}>
            <Pressable
              onPress={() =>
                details.navigation.navigate('Dashboard', {token: details.res})
              }
              android_ripple={{color: '#FFFFFF'}}>
              <Icons name={'reorder-three-sharp'} size={40} color={'#B4BAFF'} />
            </Pressable>
          </View>
        </View>
        <View style={styles.topns}>
          {todo?.map(items => {
            if (items === selector) {
              return (
                <Pressable
                  key={items}
                  onPress={() => setSelector(items)}
                  style={styles.vi}>
                  <Text style={styles.texti}>{items}</Text>
                </Pressable>
              );
            } else {
              return (
                <Pressable
                  key={items}
                  onPress={() => setSelector(items)}
                  style={styles.v}>
                  <Text style={styles.text}>{items}</Text>
                </Pressable>
              );
            }
          })}
        </View>
      </View>
      <View style={styles.bottom}>
        <FlatList
          data={allUsers}
          renderItem={({item}) => (
            <List item={item} navigation={details.navigation} res={details} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </ImageBackground>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  textview: {
    display: 'flex',
    marginLeft: 15,
    // marginRight: 5,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    fontStyle: 'italic',
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  texti: {
    fontSize: 17,
    fontWeight: '900',
    color: '#96601D',
  },
  top: {
    padding: 1,
    height: 100,
    backgroundColor: '#654EE8',
    display: 'flex',
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  tops: {
    padding: 5,
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topns: {
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topz: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    padding: 5,
    flex: 1,
    backgroundColor: '#B4BAFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  v: {
    padding: 5,
    flex: 1,
    marginTop: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vi: {
    padding: 7,
    marginBottom: 0,
    flex: 1,
    marginTop: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B4BAFF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
