import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { forkJoin, Observable, take } from 'rxjs';
import { Recipe } from '../../model/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard, MatGridListModule, MatButtonModule, MatIconModule],
  providers: [RecipeService],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  recipes$!: Observable<Recipe[]>;
  selectedRecipes = signal<number[]>([]);

  onCreate() {
    this.router.navigateByUrl('/create');
  }

  onSelect(recipeId: number) {
    if (this.selectedRecipes().includes(recipeId)) {
      this.selectedRecipes.set(this.selectedRecipes().filter((id) => id !== recipeId));
    } else {
      this.selectedRecipes.set([...this.selectedRecipes(), recipeId]);
    }
  }

  onDeleteMany() {
    forkJoin(this.selectedRecipes().map((recipeId) => this.recipeService.deleteRecipe(recipeId)))
      .pipe(take(1))
      .subscribe(() => {
        alert('Successfully deleted!');
        this.recipes$ = this.recipeService.getRecipes();
      });

    this.selectedRecipes.set([]);
  }
}
