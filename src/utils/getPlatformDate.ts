import { addDays } from 'date-fns';
import { Platform } from 'react-native';

//Adicionar 1 dia a data do calendário (vem com formato diferente ao adotado no Brasil)
export function getPlatformDate(date: Date) {
  return addDays(date, 1);
}
