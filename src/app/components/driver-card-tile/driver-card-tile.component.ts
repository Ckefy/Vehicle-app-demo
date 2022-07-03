import {Component, Input, OnInit} from '@angular/core';
import {format, parseISO} from 'date-fns';
import {DriverInterface} from "../../interfaces/driver.interface";
import {DriverService} from "../../services/driver.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {VehicleInterface} from "../../interfaces/vehicle.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

const DATE_FORMAT = 'd MMMM yyyy';
const NOTIFICATION_DURATION_S = 2;

@Component({
  selector: 'app-driver-card-tile',
  templateUrl: './driver-card-tile.component.html',
  styleUrls: ['./driver-card-tile.component.less']
})
export class DriverCardTileComponent implements OnInit {
  @Input()
  driver: DriverInterface;

  public vehicle$: Observable<VehicleInterface | undefined>;

  constructor(
    private driverService: DriverService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    if (this.driver.vehicleId) {
      this.vehicle$ = this.driverService.getVehicleById$(this.driver.vehicleId);
    }
  }

  public formatDate(dateISO: string): string {
    return `Birthday date: ${format(parseISO(dateISO), DATE_FORMAT)}`;
  }

  public calculateAge(birthdayString: string) {
    const birthday = parseISO(birthdayString);
    const today = new Date();
    const yearsDifference = today.getFullYear() - birthday.getFullYear();
    const monthesDifference = today.getMonth() - birthday.getMonth();

    if (monthesDifference < 0 || monthesDifference === 0 && today.getDate() < birthday.getDate()) {
      return yearsDifference - 1;
    }

    return yearsDifference;
  }

  public onEmailClick(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  public openNotification(): void {
    this.snackBar.open('Plate number copied to clipboard', 'Got it!', {
      duration: NOTIFICATION_DURATION_S * 1000,
    })
  }

  public editDriver(driverId: string): void {
    this.router.navigate(['driver', driverId]);
  }

  public deleteDriver(driverId: string): void {
    this.driverService.deleteDriver(driverId);
  }
}
