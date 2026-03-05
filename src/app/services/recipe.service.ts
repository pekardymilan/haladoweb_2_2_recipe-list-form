import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';

const RECIPE_URL = 'api/recipes';

@Injectable()
export class RecipeService {
  private readonly http = inject(HttpClient);

  getRecipes() {
    return this.http.get<Recipe[]>(RECIPE_URL);
  }

  getRecipeById(recipeId: number) {
    return this.http.get<Recipe>(`${RECIPE_URL}/${recipeId}`);
  }

  createRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(`${RECIPE_URL}`, recipe);
  }

  deleteRecipe(recipeId: number) {
    return this.http.delete<Recipe>(`${RECIPE_URL}/${recipeId}`);
  }
}
