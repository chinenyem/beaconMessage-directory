import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationCreateComponent } from './notification-create/notification-create.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { BeaconsComponent } from './beacons/beacons.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-notification',
    component: NotificationCreateComponent
  },
  {
    path: 'list-notifications',
    component: NotificationListComponent
  },
  {
    path: 'notification/:id',
    component: NotificationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'beacons',
    component: BeaconsComponent
  },
  { path: '**',
    component: PageNotFoundComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
