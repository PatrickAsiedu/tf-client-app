import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface NavItem {
  name?: string;
  icon?: any;
  route?: string;
}

@Component({
  selector: 'app-navitem',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './navitem.component.html',
  styleUrl: './navitem.component.scss',
})
export class NavitemComponent implements OnInit {
  ngOnInit(): void {}
  @Input() navItem: NavItem = {};
}
