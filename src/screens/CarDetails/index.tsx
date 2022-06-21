import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
  Accessories,
  About,
  Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  function handleBackButton() {
    navigation.goBack();
  }
  return (
    <Container>
      {/* <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
      /> */}

      <Header>
        <BackButton onPress={handleBackButton} />
      </Header>

      <CarImage>
        <ImageSlider imagesUrl={car.photos} />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

        <About>
          {car.about}
        </About>

      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}