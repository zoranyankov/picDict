import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, NgForm, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appPassMatch]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PassMatchDirective,
    multi: true
  }]
})
export class PassMatchDirective implements Validator, OnDestroy{
  currentControl!: AbstractControl;
  ohterControl!: AbstractControl;
  subscription!: Subscription;

  @Input() otherValue = '';

  constructor(
    private form: NgForm
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.currentControl = control;
    this.ohterControl = this.form.controls[this.otherValue];
    const otherControlValue = this.ohterControl.value;
    
    if(this.subscription){this.subscription.unsubscribe()}
    this.subscription = this.ohterControl.valueChanges.subscribe(() => {
      this.currentControl.updateValueAndValidity({onlySelf: true})
    })

    if (this.form.invalid) {
      return control.value !== otherControlValue ? {
        passMissmatch: true
      } : null
    }
    throw new Error('Method not implemented.');
  }
  
}