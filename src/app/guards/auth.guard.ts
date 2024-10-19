import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const toster = inject(ToastrService);
  const afAuth = inject(AngularFireAuth);
  const user = await firstValueFrom(afAuth.authState);
  if (user) {
    return true;
  } else {
    toster.error('You Have To Login', 'Error');
    return false;
  }
};
