import React from 'react';
import { useNavigation } from '@react-navigation/native';


import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

export function FirstStep() {
  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>

      <Title>
        Crie sua {'\n'}
        Conta
      </Title>

      <SubTitle>
        Faça seu cadastro de{'\n'}
        forma rápida e fácil
      </SubTitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
      </Form>
    </Container>
  );
}