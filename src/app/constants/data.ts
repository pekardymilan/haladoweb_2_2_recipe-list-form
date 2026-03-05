import { Recipe, UnitOfMeasurement } from '../model/recipe.model';

export const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Pancakes',
    recipeCode: 'SWTS_0001',
    description: 'Fluffy breakfast pancakes with syrup.',
    ingredients: [
      { name: 'Flour', quantity: 200, unitOfMeasurement: UnitOfMeasurement.g },
      { name: 'Milk', quantity: 300, unitOfMeasurement: UnitOfMeasurement.ml },
      { name: 'Eggs', quantity: 2, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Sugar', quantity: 2, unitOfMeasurement: UnitOfMeasurement.tableSpoon },
    ],
  },
  {
    id: 2,
    name: 'Tomato Soup',
    recipeCode: 'SOUP_0001',
    description: 'Simple creamy tomato soup.',
    ingredients: [
      { name: 'Tomatoes', quantity: 500, unitOfMeasurement: UnitOfMeasurement.g },
      { name: 'Onion', quantity: 1, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Garlic', quantity: 2, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Olive Oil', quantity: 2, unitOfMeasurement: UnitOfMeasurement.tableSpoon },
    ],
  },
  {
    id: 3,
    name: 'Fruit Smoothie',
    recipeCode: 'SWTS_0002',
    description: 'Refreshing banana & strawberry smoothie.',
    ingredients: [
      { name: 'Banana', quantity: 1, unitOfMeasurement: UnitOfMeasurement.piece },
      { name: 'Strawberries', quantity: 150, unitOfMeasurement: UnitOfMeasurement.g },
      { name: 'Yogurt', quantity: 200, unitOfMeasurement: UnitOfMeasurement.ml },
      { name: 'Honey', quantity: 1, unitOfMeasurement: UnitOfMeasurement.tableSpoon },
    ],
  },
];
