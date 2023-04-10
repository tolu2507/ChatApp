/* eslint-disable prettier/prettier */
import React from 'react';
import Dashboard from '../component/Dashboard';
import {USER} from '../services/UserService';

const DashboardScreen = ({route, navigation}: any) => {
  const {token} = route.params;
  const details: {
    token: USER;
    navigation: any;
  } = {
    token: token,
    navigation: navigation,
  };
  return <Dashboard {...details} />;
};

export default DashboardScreen;
