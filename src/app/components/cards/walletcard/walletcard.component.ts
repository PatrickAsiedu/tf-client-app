import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-walletcard',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './walletcard.component.html',
  styleUrl: './walletcard.component.scss',
})
export class WalletcardComponent implements OnInit {
  constructor(
    private accountservice: AccountService,
    private authservice: AuthService
  ) {}
  ngOnInit(): void {}
  faPlus = faPlus;
  faMinus = faMinus;

  showDialog: boolean = false;

  @Output() dataEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() balance: any = {};

  sendData() {}

  showWalletForm() {
    this.showDialog = true;
    this.dataEmitter.emit(this.showDialog);
  }
}
