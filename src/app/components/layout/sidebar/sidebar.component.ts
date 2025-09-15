import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../container/container.component';
import { NavitemComponent } from '../navitem/navitem.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCoffee,
  faHouse,
  faBriefcase,
  faShop,
  faClockRotateLeft,
  faArrowRightFromBracket,
  IconDefinition,
  faUsers,
  faMoneyBillTrendUp
} from '@fortawesome/free-solid-svg-icons';
import { LogoComponent } from "../../logos/logo/logo.component";

interface NavItem {
  name: string;
  icon: IconDefinition;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ContainerComponent,
    NavitemComponent,
    CommonModule,
    FontAwesomeModule,
    LogoComponent
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor(private authservice: AuthService, private router: Router) {}
  ngOnInit(): void {
    if(this.authservice.getRole()==='USER'){
      this.navItems=[
        {
          name: 'Dashboard',
          icon: faHouse,
          route: '/',
        },
        {
          name: 'Marketplace',
          icon: faShop,
          route: '/marketplace',
        },
        {
          name: 'Portfolio',
          icon: faBriefcase,
          route: '/portfolios',
        },
        { name: 'Orders', icon: faClockRotateLeft, route: '/orders' },
    
        // Add more nav items here
      ];
    

    }else{
      this.navItems=[
        {
          name: 'Dashboard',
          icon: faHouse,
          route: '/admin/dashboard',
        },
        {
          name: 'Users',
          icon: faUsers,
          route: '/users',
        },
        {
          name: 'Trades',
          icon: faMoneyBillTrendUp,
          route: '/trades',
        },

    
        // Add more nav items here
      ];
      

    }
  }

  logouticon = faArrowRightFromBracket;
  logoStyles = {container :'h-12 w-12',arrow:'fill-white', f:'fill-white'}



  navItems: NavItem[] = []
  logout() {
    this.authservice.logout();
    this.router.navigate(['/signin']);
  }
}
