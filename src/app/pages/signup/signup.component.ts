import { Component } from '@angular/core';
import { SignupformComponent } from '../../components/forms/signupform/signupform.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [SignupformComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {}
