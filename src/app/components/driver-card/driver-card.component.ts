import {Component, OnDestroy, OnInit} from '@angular/core';
import {DriverService} from "../../services/driver.service";
import {BehaviorSubject, filter, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {DriverInterface} from "../../interfaces/driver.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {isDefined} from "../../helpers/typeguards.helper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {parseISO} from "date-fns";
import {VehicleInterface} from "../../interfaces/vehicle.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

interface StatusInterface {
  value: boolean;
  viewValue: string;
}

const NOTIFICATION_DURATION_S = 2;

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.less']
})
export class DriverCardComponent implements OnInit, OnDestroy {
  public vehicle$ = new BehaviorSubject<VehicleInterface | undefined>(undefined);
  public allVehicles$: Observable<VehicleInterface[]>;
  public driverForm: FormGroup;
  public editDriverMode = false;
  public statuses: StatusInterface[] = [
    {value: true, viewValue: 'Active'},
    {value: false, viewValue: 'Inactive'},
  ]

  private driverId: string;
  private onDestroy$ = new Subject<void>();

  constructor(
    private driverService: DriverService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.driverId = this.activateRoute.snapshot.params['driverId'];

    this.initDriver();
    this.initVehicle();
    this.allVehicles$ = this.driverService.getVehicles$();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public formatDate(dateISO: string): Date {
    return parseISO(dateISO);
  }

  public sendForm(): void {
    if (this.driverForm.valid) {
      const driverPayload: DriverInterface = {
        id: this.driverId,
        name: this.driverForm.get('driverName')!.value,
        surname: this.driverForm.get('driverSurname')!.value,
        email: this.driverForm.get('driverEmail')!.value,
        active: this.driverForm.get('driverStatus')!.value,
        birthDate: this.driverForm.get('driverBirthday')!.value.toISOString(),
        vehicleId: this.driverForm.get('driverVehicle')?.value,
      }

      this.driverService.setDriver(driverPayload)
      this.router.navigate(['']);

      return;
    }

    this.snackBar.open('Please check your information!', 'Got it!', {
      duration: NOTIFICATION_DURATION_S * 1000,
    })
  }

  private initDriver(): void {
    this.driverService.getDriverById$(this.driverId).pipe(
      tap((driver: DriverInterface | undefined) => {
        if (!driver) {
          this.initEmptyForm();
        }
      }),
      filter(isDefined),
      tap((driver: DriverInterface) => {
        this.editDriverMode = true;
        this.initForm(driver);
      }),
      switchMap((driver: DriverInterface) => !!driver.vehicleId ? this.driverService.getVehicleById$(driver.vehicleId) : of(undefined)),
      tap((vehicle: VehicleInterface | undefined) => {
        this.vehicle$.next(vehicle);
      }),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  private initVehicle(): void {
    this.vehicle$.pipe(
      filter(isDefined),
      tap((vehicle: VehicleInterface) => this.patchVehicleForm(vehicle)),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  private initForm(driver: DriverInterface): void {
    this.driverForm = this.fb.group({
      driverName: [driver.name, this.getNameValidators()],
      driverSurname: [driver.surname, this.getNameValidators()],
      driverEmail: [driver.email, [Validators.required, Validators.email]],
      driverStatus: [driver.active, Validators.required],
      driverBirthday: [this.formatDate(driver.birthDate), Validators.required],
      driverVehicle: [undefined],
    })
  }

  private initEmptyForm(): void {
    this.driverForm = this.fb.group({
      driverName: [null, this.getNameValidators()],
      driverSurname: [null, this.getNameValidators()],
      driverEmail: [null, [Validators.required, Validators.email]],
      driverStatus: [null, Validators.required],
      driverBirthday: [null, Validators.required],
      driverVehicle: [undefined],
    })
  }

  private getNameValidators(): Validators[] {
    return [Validators.required, Validators.pattern("^[a-zA-ZäöüÄÖÜß]{1,25}$")];
  }

  private patchVehicleForm(vehicle: VehicleInterface): void {
    this.driverForm.get('driverVehicle')!.setValue(vehicle.id);
  }
}
