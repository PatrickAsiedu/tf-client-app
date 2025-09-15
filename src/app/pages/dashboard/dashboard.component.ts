import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CardComponent } from '../../components/cards/card/card.component';

import { PortfoliographComponent } from '../../components/graphs/portfoliograph/portfoliograph.component';
import { WalletcardComponent } from '../../components/cards/walletcard/walletcard.component';
import { MaincontainerComponent } from '../../components/container/maincontainer/maincontainer.component';
import { MicrosoftComponent } from '../../components/logos/microsoft/microsoft.component';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import {
  faHourglassHalf,
  faCoins,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { WebsocketService } from '../../services/websocket.service';
import { AccountService } from '../../services/account.service';
import { TransactionType } from '../../models/account-topuo-dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CurrentUser } from '../../models/currentUser';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardComponent,
    PortfoliographComponent,
    WalletcardComponent,
    MaincontainerComponent,
    MicrosoftComponent,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private orderservice: OrderService,
    private authservice: AuthService,
    private websockectService: WebsocketService,
    private accountService: AccountService,
    private messageservice: MessageService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getAccountBalance();
    this.getUserOrderData();
    this.websockectService.getMessages().subscribe({
      next: () => {
        this.getAccountBalance();
        this.getUserOrderData();
      }
    })
    this.cdr.detectChanges();
  }

  showDialog: boolean = false;

  filledOrders: any = [];

  openOrders: any = [];

  pendingOrders: any = [];

  showModal: boolean = false;
  amount: number = 0;
  balance = 0
  isLoading = false;

  onShowModal(value: boolean) {
    this.showModal = value;
  }

  topUpAmount() {
    if(this.amount > 0){
      this.isLoading = true;
      this.accountService.topUpAccount({
        amount: this.amount,
        transactionType: TransactionType.CREDIT,
        userId: this.authservice.getUserId()
      }).subscribe({
        next: () => {
          this.showModal= false
          this.amount = 0;
          this.getAccountBalance();
          this.messageservice.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account top-up successful',
          })
        },
        error: (error) => {
          this.messageservice.add({
            severity: 'error',
            summary: 'error',
            detail: `${error.error.title}`,
          })
        }
      })
    }else{
      this.messageservice.add({
        severity: 'error',
        summary: 'error',
        detail: `Invalid amount, value must be positive`,
      })
    }
  }

  
  getAccountBalance() {
    this.userService.getProfile().subscribe({
      next: (profile: CurrentUser) => {
        this.balance = profile.account?.availableBalance || 0
      }
    })
  }

  getUserOrderData(){
    this.orderservice
      .getOrdersByUserId(this.authservice.getUserId())
      .subscribe({
        next: (result) => {
          const filteredOrders = this.orderservice.filterOrdersByStatus(result);
          this.openOrders = filteredOrders.openOrders;
          this.filledOrders = filteredOrders.filledOrders;
          this.pendingOrders = filteredOrders.pendingOrders;
          this.data=[
            {
              title: 'Pending Orders',
              style: 'from-orange-500 to-yellow-500',
              value: this.pendingOrders.length,
              icon: faHourglassHalf,
            },
            {
              title: 'Filled Orders',
              style: 'from-emerald-500 to-teal-400',
              value: this.filledOrders.length,
              icon: faCheck,
            },
            {
              title: 'Open Orders',
              style: 'from-blue-500 to-violet-500',
              value: this.openOrders.length,
              icon: faCoins,
            },
          ];

          console.log(filteredOrders.openOrders.length);
        },
        error: (error) => {
          console.log(error);

          if (error.status === 404) {
          } else {
            console.log(error);
          }
        },
      });
  }

  data: any = [
    {
      title: 'Pending Orders',
      style: 'from-orange-500 to-yellow-500',
      value: this.pendingOrders.length,
      icon: faHourglassHalf,
    },
    {
      title: 'Filled Orders',
      style: 'from-emerald-500 to-teal-400',
      value: this.filledOrders.length,
      icon: faCheck,
    },
    {
      title: 'Open Orders',
      style: 'from-blue-500 to-violet-500',
      value: this.openOrders.length,
      icon: faCoins,
    },
  ];
}
