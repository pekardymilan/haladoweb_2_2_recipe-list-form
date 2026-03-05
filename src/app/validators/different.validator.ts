import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const differentValidator = (formControlNames: string[]): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as FormGroup;

    if (!form) return null;

    const values: unknown[] = [];

    formControlNames.forEach((formControlName) => {
      const value = form.get(formControlName)?.value;

      if (value) values.push(value);
    });

    if (values.length === new Set(values).size)
      return { different: `Values of ${formControlNames.join(', ')} must not be equal!` };

    return null;
  };
};
