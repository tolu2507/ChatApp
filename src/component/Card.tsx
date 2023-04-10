/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Text, Pressable, StyleSheet} from 'react-native';
import {Service} from './Dashboard';
import {USER} from '../services/UserService';

const Card = (items: Service) => {
  return (
    <Pressable
      style={{
        margin: 15,
        padding: 5,
        backgroundColor: 'white',
        width: 330,
        height: 250,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
      }}
      onPress={items.onPress}
      disabled={items.disable}
      android_ripple={{color: '#B4BAFF'}}>
      <Image
        source={items.image}
        style={{width: 250, height: 200, borderRadius: 20}}
        resizeMode="cover"
      />
      {items.disable === false ? (
        <Text style={{color: 'green'}}>enabled</Text>
      ) : (
        <Text style={{color: 'red'}}>disabled</Text>
      )}
      <View>
        <Text style={{fontWeight: '900', fontSize: 20, color: '#654EE8'}}>
          {items.name}
        </Text>
      </View>
    </Pressable>
  );
};

export const List = ({
  item,
  navigation,
  res,
}: {
  item: USER;
  navigation: any;
  res: any;
}) => {
  return (
    <Pressable
      style={styles.list}
      onPress={() =>
        navigation.navigate('Chat', {res: item, user: res.res, data: res.data})
      }
      android_ripple={{color: '#B5BD91'}}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textview}>
        <Text style={styles.listText}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  textview: {
    display: 'flex',
    marginLeft: 15,
    // marginRight: 5,
    flex: 1,
  },
  listText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#333333',
    fontStyle: 'normal',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 15,
  },
});
