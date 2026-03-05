import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { recipes } from '../constants/data';

@Injectable()
export class InMemoryRecipeService implements InMemoryDbService {
  createDb() {
    const db = {
      recipes,
    };
    return db;
  }
}
