import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './custom validators/custom.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        CustomValidators.restrictedEmails
      ],
        [CustomValidators.uniqEmail]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormGroup({
        country: new FormControl('ua'),
        city: new FormControl('', [
          Validators.required,
        ]),
      }),
      skills: new FormArray([]),
    });
  }

  /**
   *
   */
  public submit(): void {
    console.log('formSubmited', this.form);
    const formData = {...this.form.value};
    this.form.reset();
  }

  /**
   *
   */
  public setCapital(): void {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск',
    };
    const cityKey = this.form.get('address').get('country').value;
    console.log(cityKey);
    const city = cityMap[cityKey];
    this.form.patchValue({address: {city}});
  }

  /**
   *
   */
  public addSkill(): void {
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control);
  }
}
