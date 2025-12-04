import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductcardComponent } from '../../components/cards/productcard/productcard.component';
import { ProductsgraphComponent } from '../../components/graphs/productsgraph/productsgraph.component';
import { MaincontainerComponent } from '../../components/container/maincontainer/maincontainer.component';
import { OrderformComponent } from '../../components/forms/orderform/orderform.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardComponent } from '../../components/cards/card/card.component';

import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { WebsocketService } from '../../services/websocket.service';


@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [
    ProductcardComponent,
    ProductsgraphComponent,
    MaincontainerComponent,
    OrderformComponent,
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    CardComponent,
  ],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss',
})
export class MarketplaceComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private productservice: ProductService, private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    this.getProductData();
    this.webSocketService.getMessages().subscribe({
      next: () => {
        this.getProductData();
      }
    })
  }

  getProductData(){
    this.productservice.getAllProducts().subscribe({
      next: (result) => {
        this.products = result.map((p) => ({
          ...p,
          icon: this.productservice.addIconsToProducts(p.ticker as string),
          name: this.productservice.addNameToProducts(p.ticker as string),
        })).sort((a, b) => Number(b?.lastTradedPrice) - Number(a?.lastTradedPrice));

        // console.log(this.products);
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

  products: Product[] = [];

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
