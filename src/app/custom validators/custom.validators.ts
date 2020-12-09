import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

/**
 * Черный список эмейлов
 */
export class CustomValidators {
 static restrictedEmails(control: FormControl): {[key: string]: boolean} {
   if (['saqhan@mail.ru'].includes(control.value)) {
     return {restrictedEmail: true};
   }
   return null;
 }

 static uniqEmail(control: FormControl): Promise<{[key: string]: boolean}> | Observable<{[key: string]: boolean}> {
   return new Promise(resolve => {
     setTimeout(() => {
        if (control.value === 'almalib@bk.ru') {
          resolve({
            uniqEmail: true
          });
        } else {
          resolve(null);
        }
     }, 2000);
   });
 }
}
