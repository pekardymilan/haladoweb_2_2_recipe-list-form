import { Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuidV4 } from 'uuid';
import { Ingredient, Recipe, UnitOfMeasurement } from '../../model/recipe.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../../services/recipe.service';
import { take } from 'rxjs';
import { recipeCodeValidator } from '../../validators/recipe-code.validator';
import { differentValidator } from '../../validators/different.validator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-create-recipe',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [RecipeService],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css',
})
export class CreateRecipe implements OnInit {
  //we can easily build forms with formBuilder injected
  readonly formBuilder = inject(FormBuilder);
  readonly router = inject(Router);
  readonly recipeService = inject(RecipeService);

  ngOnInit(): void {
    //we define the from by adding form controls, groups or arrays into one parent group
    this.recipeForm = this.formBuilder.group(
      {
        //a control can be made easily by passing an array form formBuilder, where the first value is the initial value of the control, the second is an array of validators
        name: ['', [Validators.required]],
        //there are default angular validators such as required or minLength, but we can also define our custom ones
        recipeCode: ['', [Validators.required, recipeCodeValidator]],
        description: [''],
        //we can handle array of objects with form arrays of form groups for example
        ingredients: this.formBuilder.array(
          [this._getIngredientFormGroup()],
          [Validators.minLength(1)]
        ),
      },
      {
        //we can also set form wide validators
        validators: [differentValidator(['name', 'description'])],
      }
    );

    this.recipeForm
      .get('ingredients')
      //we can listen for form changes with the valueChanges observable which emits the control's or the group's modified new value
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((ingredients: Ingredient[]) => this.totalIngredients.set(ingredients.length));
  }

  recipeForm!: FormGroup;
  totalIngredients = signal(1);

  private _getIngredientFormGroup() {
    return this.formBuilder.group({
      //each form group of a form array needs to have a unique id, thats why we need uuidV4, there also other methods,
      // but be careful with index if you can also delete form groups of a form array
      id: [uuidV4()],
      name: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unitOfMeasurement: [UnitOfMeasurement.piece, [Validators.required]],
    });
  }

  get ingredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredients() {
    return this.recipeForm.get('ingredients')?.value ?? [];
  }

  get unitOfMeasurements() {
    return Object.values(UnitOfMeasurement);
  }

  get ingredientFormGroups(): FormGroup[] {
    return this.ingredientsFormArray.controls as FormGroup[];
  }

  addIngredient() {
    this.ingredientsFormArray.push(this._getIngredientFormGroup());
  }

  removeIngredient(id: string) {
    const index = this.ingredientsFormArray.controls.findIndex(
      (control) => control.get('id')?.value === id
    );
    if (index !== -1) {
      this.ingredientsFormArray.removeAt(index);
    }
  }

  onCancel() {
    this.router.navigateByUrl('');
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipe: Recipe = this.recipeForm.value;
      this.recipeService
        .createRecipe(recipe)
        .pipe(take(1))
        .subscribe((recipe) => console.log(recipe));
      this.router.navigateByUrl('');
    } else {
      alert('Form is invalid!');
    }
  }
}
