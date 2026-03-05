import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { CreateRecipe } from './components/create-recipe/create-recipe';

export const routes: Routes = [
  {
    path: '',
    component: RecipeList,
  },
  {
    path: 'create',
    component: CreateRecipe,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
