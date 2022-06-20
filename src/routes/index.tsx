import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

/*A documentação do React Native Gesture Handler, 
a versão atual e as próximas necessitam que em volta de nossa aplicação utilize o 
provider GestureHandlerRootView para os botões do tipo RectButton possam funcionar
*/
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StackRoutes } from './stack.routes';

export function Routes() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}