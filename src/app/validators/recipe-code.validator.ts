import { AbstractControl, ValidationErrors } from '@angular/forms';

export const recipeCodeValidator = (control: AbstractControl): ValidationErrors | null => {
  const recipeCodeRegexp = new RegExp(/^[A-Z]{4}_\d{4}$/);
  const value: string = control.value;

  if (!value || value.length !== 9) return { recipeCode: "Recipe code's length must be exactly 9" };

  if (!recipeCodeRegexp.test(value)) return { recipeCode: 'Invalid recipe code format' };

  return null;
};
