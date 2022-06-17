import React from 'react';
import { Alert, StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImage,
  Content,
  Description,
  Details,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About
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

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <About>
          Este é automóvel desportivo. Surgiu do
          lendário touro de lide indultado na praça Real
          Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </About>

      </Content>
    </Container>
  );
}