import { Component } from '@angular/core';
import { SigninformComponent } from '../../components/forms/signinform/signinform.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [SigninformComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {}
