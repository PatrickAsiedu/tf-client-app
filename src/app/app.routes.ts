import { Routes } from '@angular/router';
import { RootlayoutComponent } from './components/layout/rootlayout/rootlayout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './guards/auth.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { roleGuard } from './guards/role.guard';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PortfoliosComponent } from './pages/portfolios/portfolios.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { TradesComponent } from './pages/admin/trades/trades.component';
import { AdmindashboardComponent } from './pages/admin/admindashboard/admindashboard.component';
import { VerifyemailComponent } from './pages/verifyemail/verifyemail.component';
import { ConfirmemailComponent } from './pages/confirmemail/confirmemail.component';

export const routes: Routes = [
  {
    path: '',
    component: RootlayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [authGuard,roleGuard],
        data: { role: 'USER'  },
      },
      {
        path: 'marketplace',
        component: MarketplaceComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'USER' },
      },
      {
        path: 'portfolios',
        component: PortfoliosComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'USER' },
      },
      {
        path: 'portfolios/:id',
        component: PortfolioComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'USER' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'USER' },
      },
      {
        path: 'admin/dashboard',
        component: AdmindashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'ADMIN' },
      },
      {
        path: 'trades',
        component: TradesComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'ADMIN' },
      },
    ],
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {path:'confirmemail',component:ConfirmemailComponent},
  {path:'email-verification',component:VerifyemailComponent},
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotfoundComponent },
];
