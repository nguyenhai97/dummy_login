import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './src/components/Login';
import ListUsers from './src/components/ListUsers';

const AppNavigator = createStackNavigator(
  {
    Login: Login,
    ListUsers: ListUsers
  },
  {
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppNavigator);