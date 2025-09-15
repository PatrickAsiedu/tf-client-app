import { Component, Input } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolioitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolioitem.component.html',
  styleUrl: './portfolioitem.component.scss'
})
export class PortfolioitemComponent {

  @Input() portoflio : Portfolio = {}

}
