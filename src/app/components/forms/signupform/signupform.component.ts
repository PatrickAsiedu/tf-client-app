import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { LogoComponent } from "../../logos/logo/logo.component";

@Component({
  selector: 'app-signupform',
  standalone: true,
  imports: [FormsModule, SpinnerComponent, MessagesModule, LogoComponent],
  templateUrl: './signupform.component.html',
  styleUrl: './signupform.component.scss',
})
export class SignupformComponent {
  email = '';
  name = '';
  password = '';
  isLoading: boolean = false;
  messages: Message[] = [];
  constructor(private authservice: AuthService, private router: Router) {}
  logoStyles = {container :'h-14 w-14',arrow:'fill-primary', f:''}

  signup(e: Event) {
    e.preventDefault();
    this.isLoading = true;
    this.authservice.register(this.email, this.name, this.password).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.email = '';
        this.name = '';
        this.password = '';
        this.router.navigate(['/confirmemail'])
        // setTimeout(() => {
        //   this.router.navigate(['/signin']);
        // }, 5000);
      },
      error: (error) => {
        if (error.status === 409) {
          this.messages = [
            { severity: 'error', detail: error.error.detail },
          ];
          this.isLoading = false;
        } else {
          this.isLoading = false;
          console.error(error.message);
        }
      },
    });

    
  }
}
