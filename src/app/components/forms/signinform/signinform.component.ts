import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { LogoComponent } from '../../logos/logo/logo.component';

//import { HttpClient } from '@angular/common/http';

interface LoginModel {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-signinform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MessagesModule,
    SpinnerComponent,
    LogoComponent,
  ],
  providers: [AuthService],
  templateUrl: './signinform.component.html',
  styleUrl: './signinform.component.scss',
})
export class SigninformComponent {
  email = '';
  password = '';
  isLoading = false;
  loginModel: LoginModel = { email: '', password: '' };
  messages: Message[] = [];
  logoStyles = { container: 'h-14 w-14', arrow: 'fill-primary', f: '' };
  constructor(private authService: AuthService) {}

  login(form: NgForm) {
    // prevent submission if the form is invalid
    if (form.invalid) {
      // mark all controls as touched to expose validation errors
      Object.values((form as any).controls || {}).forEach(
        (c: any) => c.markAsTouched && c.markAsTouched()
      );
      this.messages = [
        { severity: 'error', detail: 'Please fix the errors in the form.' },
      ];
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.email = '';
        this.password = '';
        form.resetForm();
      },
      error: (error) => {
        if (error.status === 401) {
          this.messages = [{ severity: 'error', detail: error.error.detail }];
          this.isLoading = false;
        } else if (error.status === 403) {
          this.messages = [{ severity: 'error', detail: error.error.detail }];
          this.isLoading = false;
        } else {
          this.messages = [{ severity: 'error', detail: "Internal Server Error" }];
          this.isLoading = false;
        }
      },
    });
  }
}
