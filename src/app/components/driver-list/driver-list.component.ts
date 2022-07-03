import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DriverInterface} from "../../interfaces/driver.interface";
import {DriverService} from "../../services/driver.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.less']
})
export class DriverListComponent implements OnInit {

  public drivers$: Observable<DriverInterface[]>;
  public isLoaded$: Observable<boolean>;

  constructor(
    private driverService: DriverService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.isLoaded$ = this.driverService.getLoadingState$();
    this.drivers$ = this.driverService.getDrivers$();
  }

  public addNewDriver(): void {
    // pretty simple way to generate unique id
    this.router.navigate(['driver', `${Date.now()}`]);
  }

}
