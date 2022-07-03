import {Component, OnInit} from '@angular/core';
import {DriverService} from "./services/driver.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private driverService: DriverService) {
  }

  ngOnInit() {
    this.driverService.loadDrivers();
  }
}
