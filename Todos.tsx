/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import Todo from './src/component/Todo';
import firestore from '@react-native-firebase/firestore';
import {
  Appbar,
  TextInput,
  Button,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
let initial: {id: string; title: string; complete: boolean} = {
  id: '',
  title: '',
  complete: false,
};
export default function Todos() {
  const ref = firestore().collection('todos');
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([initial]);

  async function addTodo() {
    if (!loading) {
      setLoading(true);
    }
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list: any = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    });
  }, [loading, ref]);

  if (loading) {
    return (
      <ActivityIndicator
        animating={true}
        color={MD2Colors.lightGreenA700}
        size={50}
        style={{marginTop: 350}}
      />
    );
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Todo {...item} />}
      />
      <TextInput
        label={'New Todo'}
        value={todo}
        onChangeText={setTodo}
        right={<TextInput.Icon icon="pen" />}
      />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  );
}
