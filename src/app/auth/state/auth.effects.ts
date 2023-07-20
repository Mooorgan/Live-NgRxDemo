import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { loginStart, loginSuccess } from './auth.actions';
import { EMPTY, catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthResponseData } from 'src/app/model/authResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.authService.formatUser(data);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return loginSuccess({ user });
            // return 'hello'
          }),
          catchError((errResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            // console.log(errResponse.error.error.message);
            const errorCode = errResponse.error.error.message;
            const errorMessage = this.authService.getErrorMessage(errorCode);
            return of(setErrorMessage({ message: errorMessage }));
            // return setErrorMessage({ message: errorMessage });
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          console.log('On loginSuccess Redirect');
          this.router.navigate(['/']);
          console.log('On successfull loginSuccess Redirect');
        })
      );
    },
    { dispatch: false }
  );
}
