import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

/**
 * Estrutura da tabela de carros
 */

class Car extends Model {
  static table = 'cars'

  @field('name')
  name!: string;

  @field('brand')
  brand!: string;

  @field('about')
  about!: string;

  @field('fuel_type')
  fuel_type!: string;

  @field('period')
  period!: string;

  @field('price')
  price!: string;

  @field('thumbnail')
  thumbnail!: string;
}

export { Car };