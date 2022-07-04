import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText
} from './styles';

//Tipando Icones
interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function Input({
  iconName,
  value,
  ...rest
}: Props) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocused() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>

      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_details}
          size={24}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}