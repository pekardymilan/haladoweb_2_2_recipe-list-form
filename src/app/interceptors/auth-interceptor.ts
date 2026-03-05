import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageKeys } from '../constants/local-storage-keys';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (token) {
    const modifiedReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    return next(modifiedReq);
  }

  return next(req);
};
