import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';

//Telas para navegações TAB / rotas autenticadas
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="Inicio" component={AppStackRoutes} />
      <Screen name="Profile" component={Home} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}