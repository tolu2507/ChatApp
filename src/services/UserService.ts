/* eslint-disable prettier/prettier */
import {firebase} from '@react-native-firebase/firestore';

export type USER = {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  image: string;
  onPress?: () => void;
};
export const Service = {
  createUser: async (details: USER) => {
    await firebase.firestore().collection('User').add({
      name: details.name,
      email: details.email,
      password: details.password,
      phonenumber: details.phonenumber,
      image: details.image,
    });
  },
};
