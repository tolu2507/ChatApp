/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Pressable, View, Image, ImageSourcePropType} from 'react-native';

export type Users = {
  name: string;
  icon?: any;
  image?: ImageSourcePropType;
  onPress: () => void;
  style: {};
  color: string;
};

const User = ({
  name,
  icon,
  image,
  onPress,
  style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  color,
}: Users) => {
  return (
    <Pressable onPress={onPress} style={style} android_ripple={{color: color}}>
      <View style={{marginRight: 5}}>{icon && icon}</View>
      <View style={{marginRight: 5}}>
        {image && (
          <Image
            source={image}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: '#008000',
            }}
          />
        )}
      </View>
      <View>
        <Text style={{fontSize: 22, color: 'white'}}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default User;
