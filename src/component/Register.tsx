/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TextInput, Image, Platform, Alert} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {Button} from './Button';
// import {person} from './images';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {Service, USER} from '../services/UserService';

const Register = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('07038968337');
  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const selectImage = () => {
    const options: any = {
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(response);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setImage(null);
    const url = await storage().ref(`${filename}`).getDownloadURL();
    if (url !== null || url === undefined) {
      console.log(url);
      setImageUrl(url);
    }
  };

  const signUp = async () => {
    try {
      const user_details: USER = {
        name: name,
        email: email,
        password: password,
        phonenumber: phonenumber,
        image: imageUrl,
      };
      await Service.createUser(user_details);
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('Dashboard', {token: user_details});
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
        padding: 5,
        display: 'flex',
        flex: 1,
        backgroundColor: '#654EE8',
      }}>
      <View
        style={{
          padding: 15,
          display: 'flex',
          flex: 1,
        }}>
        <View>
          {image === null ? (
            <Button
              style={{
                borderRadius: 5,
                width: 150,
                height: 50,
                backgroundColor: '#B4BAFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={selectImage}
              text="Pick an image"
            />
          ) : !uploading ? (
            <Button
              style={{
                borderRadius: 5,
                width: 150,
                height: 50,
                backgroundColor: '#B4BAFF',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
              }}
              onPress={uploadImage}
              text="Upload image"
            />
          ) : null}
          <View
            style={{
              padding: 5,
              width: 300,
              height: 160,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {image !== null ? (
              <View
                style={{
                  padding: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 50,
                }}>
                <Image
                  source={{uri: image.uri}}
                  style={{width: 150, height: 150, borderRadius: 50}}
                />
              </View>
            ) : null}
            {uploading ? (
              <View style={{marginTop: 5}}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : (
              <View />
            )}
          </View>
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              marginBottom: 10,
              borderWidth: 0,
              paddingHorizontal: 10,
              borderRadius: 15,
              padding: 15,
              backgroundColor: '#7D67F7',
              color: 'white',
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
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: '#7D67F7',
            }}
          />
          <TextInput
            placeholder="Phonenumber"
            value={phonenumber}
            onChangeText={setPhonenumber}
            keyboardType="numeric"
            style={{
              marginBottom: 10,
              padding: 15,
              borderWidth: 0,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: '#7D67F7',
              color: 'white',
            }}
          />
          <TextInput
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            style={{
              marginBottom: 10,
              padding: 15,
              borderWidth: 0,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: '#7D67F7',
              color: 'white',
            }}
          />
          <Button
            text={'Sign In'}
            onPress={signUp}
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
            <Text
              style={{color: 'black', fontFamily: 'San-serif', fontSize: 22}}>
              Already Registered ?
            </Text>
            <Button
              text={'Sign in'}
              onPress={() => navigation.navigate('Login')}
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
    </View>
  );
};

export default Register;
