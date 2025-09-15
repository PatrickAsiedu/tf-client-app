import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verifyemail',
  standalone: true,
  imports: [],
  templateUrl: './verifyemail.component.html',
  styleUrl: './verifyemail.component.scss',
})
export class VerifyemailComponent implements OnInit {
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTokenFromQueryParams();

    this.authService.verifyEmail(this.token as string).subscribe({
      next: (result) => {
        console.log(result);
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        if (error.status === 409) {
        } else {
          console.error(error.message);
        }
      },
    });
  }

  getTokenFromQueryParams(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log(this.token);
  }
}
