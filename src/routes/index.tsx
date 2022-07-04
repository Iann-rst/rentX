import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

/*A documentação do React Native Gesture Handler, 
a versão atual e as próximas necessitam que em volta de nossa aplicação utilize o 
provider GestureHandlerRootView para os botões do tipo RectButton possam funcionar
*/
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';


export function Routes() {
  const { user } = useAuth();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {user ? <AppTabRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}