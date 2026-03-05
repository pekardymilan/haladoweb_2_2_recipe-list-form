export interface Recipe {
  id?: number;
  recipeCode: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: number;
  unitOfMeasurement: UnitOfMeasurement;
}

export enum UnitOfMeasurement {
  ml = 'ml',
  g = 'g',
  kg = 'kg',
  l = 'l',
  piece = 'piece',
  dkg = 'dkg',
  tableSpoon = 'tableSpoon',
}
