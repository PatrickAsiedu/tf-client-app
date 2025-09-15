import { Component, Input, OnInit } from '@angular/core';
import { MicrosoftComponent } from "../../logos/microsoft/microsoft.component";
import { CommonModule } from '@angular/common';

export interface Product {
  askPrice?: number;
  bidPrice?: number;
  buyLimit?: number;
  id?: string;
  lastTradedPrice?: number;
  maxShiftPrice?: number;
  sellLimit?: number;
  ticker?: string;
  trading?: boolean;
  icon?:string
  name?:string
}

@Component({
  selector: 'app-productcard',
  standalone: true,
  imports: [MicrosoftComponent, CommonModule],
  templateUrl: './productcard.component.html',
  styleUrl: './productcard.component.scss',
})
export class ProductcardComponent implements OnInit {
  ngOnInit(): void {
  
  this.maxShift = Number(this.product.maxShiftPrice?.toFixed(2))

  }

  @Input() product : Product ={}
  
  maxShift = 0
}
