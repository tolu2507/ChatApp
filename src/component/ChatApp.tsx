/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';
import {firebase} from '@react-native-firebase/firestore';
import {Button} from './Button';
import User from '../common/User';
import {background, white} from './images';

type Message = {
  id: string;
  texts: string;
  read?: boolean;
  createdAt: number;
  user: {
    uid: number;
    displayName: string;
  };
};

const ChatScreen = ({route, navigation}: any) => {
  const {res, user, data} = route.params;
  const [messages, setMessages] = useState<Message[] | any[]>([]);
  const [text, setText] = useState<string>('');
  const [ids, setId] = useState<number>(0);
  const [bool, setBool] = useState<boolean>(true);
  const [selected, setSelected] = useState<Message['id'][]>([]);
  const [mode, setMode] = useState(background);
  const string = user.id + res.id;

  const cast: () => any = () => {
    if (string !== null || string !== undefined || string.length > 0) {
      let response: string;
      let modifiedString = string.replace(/[0-9]/g, '').toUpperCase();
      response = modifiedString.split('').sort().join('');
      return response;
    }
  };

  const database: string = cast();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(database)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const datas = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (!querySnapshot.empty) {
          setMessages(datas);
        }
      });

    console.log(selected);

    return () => unsubscribe();
  }, [selected, database]);

  const onSend = async () => {
    setBool(false);
    let count = ids + 1;
    const createdAt = new Date().getTime();
    setId(count);

    await firebase
      .firestore()
      .collection(database)
      .add({
        texts: text,
        createdAt,
        read: bool,
        user: {
          uid: user.id,
          displayName: user.name,
        },
      });

    setText('');
  };

  const renderItem = ({item}: {item: Message}) => {
    let {id} = item;
    const backgroundColor =
      item.user.displayName === user.name ? '#654EE8' : '#B4BAFF';
    const alignItems =
      item.user.displayName === user.name ? 'flex-end' : 'flex-start';
    const color = item.user.displayName === user.name ? 'white' : 'black';

    return (
      <View
        key={item.id}
        style={{
          backgroundColor: 'transparent',
          alignItems,
        }}>
        <TouchableOpacity
          style={{
            maxWidth: 320,
            alignItems,
            backgroundColor,
            padding: 7,
            display: 'flex',
            marginBottom: 10,
            borderRadius: 15,
          }}
          delayLongPress={100}
          onLongPress={() => {
            console.log('pressed this item with id ' + item.id);
            if (!selected.includes(id)) {
              setSelected(prev => [...prev, id]);
            }
          }}
          onPress={() => setSelected(selected.filter(items => items !== id))}
          activeOpacity={0.6}>
          <Text style={{fontSize: 18, color, textAlign: 'left'}}>
            {item.texts}
          </Text>
          {item.user.displayName === user.name && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 80,
              }}>
              {selected.includes(id) ? (
                <View>
                  <Icon name={'star'} color={'black'} />
                </View>
              ) : (
                <View />
              )}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View>
                  <Text>time</Text>
                </View>
                <View>
                  {item?.read === true ? (
                    <Icons
                      name={'md-checkmark-done-sharp'}
                      color={'black'}
                      size={18}
                    />
                  ) : (
                    <Icons
                      name={'md-checkmark-sharp'}
                      color={'black'}
                      size={18}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const borderColor = res.name ? '#008000' : 'red';

  return (
    <ImageBackground source={mode} style={{flex: 1}}>
      {res.name && (
        <View style={{flex: 1, margin: 1}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: mode === background ? '#B4BAFF' : '#654EE8',
              height: 80,
              borderBottomLeftRadius: 35,
              borderBottomRightRadius: 35,
            }}>
            <Pressable
              onPress={() => {
                setSelected([]);
                navigation.navigate('Users', {res: user, data: data});
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 1,
                borderRadius: 15,
              }}
              android_ripple={{color: '#FFFFFF'}}>
              <Icons
                name={'arrow-back-circle-sharp'}
                size={20}
                color={'white'}
              />
              <Image
                source={{uri: res.image}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor,
                }}
              />
            </Pressable>
            <User
              name={res.name}
              onPress={() =>
                console.log('this is the profile details, thou you are coding')
              }
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
              }}
              color={'white'}
            />
            <Button
              icon={
                <Icons name={'reorder-three-sharp'} size={35} color={'white'} />
              }
              onPress={() => {
                setBool(true);
                setMode(mode === white ? background : white);
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                marginRight: 2,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: 5,
              display: 'flex',
            }}>
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              inverted
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 3,
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: 150,
              borderTopLeftRadius: 35,
              borderBottomRightRadius: 35,
            }}>
            <TextInput
              style={{
                flex: 1,
                margin: 2,
                backgroundColor: mode === background ? '#B4BAFF' : '#654EE8',
                color: mode === background ? '#654EE8' : '#FFFFFF',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              multiline={true}
              placeholder="Send Message"
              value={text}
              onChangeText={setText}
            />
            <Button
              icon={<Icon name={'send'} size={25} color={'#FFFFFF'} />}
              onPress={onSend}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: mode === background ? '#B4BAFF' : '#654EE8',
                width: 50,
                height: 50,
                borderRadius: 25,
                padding: 5,
                marginLeft: 2,
              }}
            />
          </View>
        </View>
      )}
      {!res.name && (
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              padding: 10,
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{res}</Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};

export default ChatScreen;
