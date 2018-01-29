import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from '../../components/details/details.component';

const routes: Routes = [
  { path: 'details/:name', component: DetailsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
