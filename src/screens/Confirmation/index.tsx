import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';


import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

interface Navigation {
  navigate: (value: string) => void;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<Navigation>();

  const route = useRoute();
  const { message, nextScreenRoute, title } = route.params as Params;

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}