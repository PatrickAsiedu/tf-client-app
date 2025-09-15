import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/layout/container/container.component';
import { MaincontainerComponent } from '../../components/container/maincontainer/maincontainer.component';
import { PortfolioitemComponent } from '../../components/portfolioitem/portfolioitem.component';
import { NongridcontainerComponent } from '../../components/container/nongridcontainer/nongridcontainer.component';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { Portfolio } from '../../models/portfolio';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-portfolios',
  standalone: true,
  imports: [
    ContainerComponent,
    MaincontainerComponent,
    PortfolioitemComponent,
    NongridcontainerComponent,
    CommonModule,
    RouterModule,
    SpinnerComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule
  ],
  templateUrl: './portfolios.component.html',
  styleUrl: './portfolios.component.scss',
  providers: [MessageService]
})
export class PortfoliosComponent implements OnInit {
  constructor(
    private portfolioservice: PortfolioService,
    private authservice: AuthService,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    this.getPortfolio()
  }

  porfolios: Portfolio[] = [];

  isLoading: boolean = true;

  showDialog: boolean = false;

  name: string = '';

  showAddPorfolioForm() {
    this.showDialog = true;
  }

  getPortfolio() {
    this.portfolioservice
      .getPortfoliosByUser(this.authservice.getUserId())
      .subscribe({
        next: (result) => {
          this.porfolios = result;
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Not Found');
          } else {
            console.error(error.message);
          }
        },
      });
  }

  addPortfolio() {
    this.portfolioservice.createPortfolio(
      this.name,
      this.authservice.getUserId(),
      // false
    ).subscribe({
      next: (result) => {
        this.getPortfolio()
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${this.name} added successfully`,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error?.title || 'Failed to place order, Try again'}`,
        });
      },
    });
    this.showDialog = false;
    
  }
}
