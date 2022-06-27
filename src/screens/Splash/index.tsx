import React from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;

import { Container } from './styles';

export function Splash() {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bezier(1, 1.6, 1, -0.94)
          })
        }
      ]
    }
  });

  function handlePosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }
  return (
    <Container>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="mover" onPress={handlePosition} />

    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});


/**
 * useSharedValue - hook para compartilhar com nossa animação o valor
 * animatedStyles - objeto de estilos animados para conseguir modificar a animação dos objetos
 * 
 * https://cubic-bezier.com/
 */