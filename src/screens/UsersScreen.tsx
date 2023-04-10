/* eslint-disable prettier/prettier */
import React from 'react';
import Users from '../component/Users';

const UsersScreen = ({navigation, route}: any) => {
  const {data, res} = route.params;
  const details = {
    data: data,
    res: res,
    navigation: navigation,
  };
  return <Users {...details} />;
};

export default UsersScreen;
