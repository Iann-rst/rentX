import React from 'react';
import { Alert, StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImage
} from './styles';

export function CarDetails() {

  function Alerta() {
    Alert.alert("Botão de Voltar")
  }
  return (
    <Container>
      {/* <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
      /> */}

      <Header>
        <BackButton onPress={Alerta} />
      </Header>

      <CarImage>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </CarImage>
    </Container>
  );
}