import React from 'react';
import { Alert, StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header
} from './styles';

export function CarDetails() {

  function Alerta() {
    Alert.alert("Botão de Voltar")
  }
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <Header>
        <BackButton onPress={Alerta} />
      </Header>

    </Container>
  );
}