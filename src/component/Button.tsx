/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

type Animated = {
  text?: string | undefined;
  icon?: any;
  onPress: () => any;
  textStyle?: {};
  view?: {};
  animationStyle?: {};
  animate?: string;
};

type Normal = {
  text?: string | undefined;
  icon?: any;
  onPress: () => any;
  style?: {};
  textStyle?: {};
};

export const AnimatedButton = ({
  text,
  view,
  icon,
  onPress,
  textStyle = {fontSize: 15, fontWeight: 900},
  animationStyle,
  animate,
}:Animated) => {
  return (
    <Animatable.View
      animation={animate}
      easing="ease-in-out"
      iterationCount={'infinite'}
      style={animationStyle}>
      <Pressable onPress={onPress} android_ripple={{color: 'white'}}>
        <View style={view}>
          {text && <Text style={textStyle}>{text}</Text>}
          {icon && icon}
        </View>
      </Pressable>
    </Animatable.View>
  );
};

export const Button = ({
  text,
  icon,
  onPress,
  textStyle = {fontSize: 15, fontWeight: 900},
  style,
}: Normal) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{color: 'white'}}
      style={style}>
      {text && <Text style={textStyle}>{text}</Text>}
      {icon && icon}
    </Pressable>
  );
};
