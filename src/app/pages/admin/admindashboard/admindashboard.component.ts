import { Component, OnInit } from '@angular/core';
import { MaincontainerComponent } from '../../../components/container/maincontainer/maincontainer.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { PortfoliographComponent } from '../../../components/graphs/portfoliograph/portfoliograph.component';
import { CommonModule } from '@angular/common';
import { faBan ,faHourglassHalf, faCoins  ,faCheck , faUsers} from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../../../services/order.service';
import { switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [
    MaincontainerComponent,
    CardComponent,
    PortfoliographComponent,
    CommonModule,
  ],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss',
})
export class AdmindashboardComponent implements OnInit{
constructor (private orderservice: OrderService,private userService : UserService){}
filledOrders: any = [];

openOrders: any = [];

cancelledOrders: any = [];

pendingOrders:any =[];

allUsers:any=[]
ngOnInit(): void {
  this.orderservice
    .getAllOrders()
    .pipe(
      switchMap((orders) => {
        const filteredOrders = this.orderservice.filterOrdersByStatus(orders);
        this.openOrders = filteredOrders.openOrders;
        this.filledOrders = filteredOrders.filledOrders;
        this.cancelledOrders = filteredOrders.cancelledOrders;
        this.pendingOrders = filteredOrders.pendingOrders;

        // After getting orders, get all users
        return this.userService.getAllUsers();
      })
    )
    .subscribe({
      next: (users) => {
        this.allUsers = users; // Store the fetched users

        // Update your data array with the number of users
        this.data = [
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
          {
            title: 'Cancelled Orders',
            style: 'from-orange-500 to-red-700',
            value: this.cancelledOrders.length,
            icon: faBan,
          },
          {
            title: 'Pending Orders',
            style: 'from-orange-500 to-yellow-500',
            value: this.pendingOrders.length,
            icon: faHourglassHalf,
          },
          {
            title: 'All Users',
            style: 'from-yellow-500 to-lime-500',
            value: this.allUsers.length, // Use the length of the users array
            icon: faUsers,
          },
        ];

        console.log(this.openOrders.length, this.allUsers.length);
      },
      error: (error) => {
        console.log(error);

        if (error.status === 404) {
          // Handle 404 error
        } else {
          console.log(error);
        }
      },
    });
}
  
  data = [
    {
      title: 'Filled Orders',
      style: 'from-emerald-500 to-teal-400',
      value: 0,
      icon: faCheck,
    },
    {
      title: 'Open Orders',
      style: 'from-blue-500 to-violet-500',
      value: 0,
      icon: faCoins,
    },
    {
      title: 'Cancelled Orders',
      style: 'from-orange-500 to-red-500',
      value: 0,
      icon: faBan,
    },
    {
      title: 'Pending Orders',
      style: 'from-orange-500 to-yellow-500',
      value: 0,
      icon: faHourglassHalf,
    },
    {
      title: 'All Users',
      style: 'from-yellow-500 to-lime-500',
      value: 0,
      icon: faUsers,
    },
  ];
}
