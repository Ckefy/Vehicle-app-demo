import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DriverCardComponent} from "./components/driver-card/driver-card.component";
import {DriverListComponent} from "./components/driver-list/driver-list.component";

const routes: Routes = [
  { path: '', component: DriverListComponent },
  { path: 'driver/:driverId', component: DriverCardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
