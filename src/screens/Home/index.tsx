import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../databases';
import { api } from '../../services/api';

import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as ModelCar } from '../../databases/model/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';

export function Home() {

  //ctx - contexto
  /**
   * onStart - salva a posição de x e y no contexto
   * onActive - incrementa a posição de x e y enquanto o usuário está movimentando o botão + posição salva no contexto
   */

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
        const { changes, latestVersion } = response.data;
        console.log("#### SINCRONIZAÇÃO ####")
        console.log(changes);
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        if (isMounted) {
          setCars(cars);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    //Função de limpeza Memory Leak
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected])

  /* Saber se o usuário está onLine com a lib NETINFO
  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Você está On-Line');
    } else {
      Alert.alert('Você está Off-line');
    }
  }, [netInfo.isConnected]);
*/
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {
            !loading &&
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      {
        loading ? <LoadAnimation /> :

          <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
          />
      }

    </Container>
  );
}