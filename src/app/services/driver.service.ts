import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {AppState} from "../state/app/app.state";
import {
  DeleteDriver, LoadedSucessfully,
  SetDriver, SetDriversAndVehicles
} from "../state/drivers-and-vehicles/drivers-and-vehicles.actions";
import {
  getDriverById,
  getVehicleById,
  selectDrivers, selectLoadingState, selectVehicles
} from "../state/drivers-and-vehicles/drivers-and-vehicles.selectors";
import {map, Observable, take, tap} from "rxjs";
import {DriverInterface} from "../interfaces/driver.interface";
import {VehicleInterface} from "../interfaces/vehicle.interface";
import {BackendService} from "./backend.service";
import {DriversAndVehiclesInterface} from "../interfaces/drivers-and-vehicles.interface";

const API_URL = 'http://localhost:3000/data';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private store$: Store<AppState>, private backendService: BackendService) {
  }

  public getDrivers$(): Observable<DriverInterface[]> {
    return this.store$.pipe(select(selectDrivers));
  }

  public getVehicles$(): Observable<VehicleInterface[]> {
    return this.store$.pipe(select(selectVehicles));
  }

  public getDriverById$(driverId: string): Observable<DriverInterface | undefined> {
    return this.store$.pipe(select(getDriverById(driverId)));
  }

  public getVehicleById$(vehicleId: string): Observable<VehicleInterface | undefined> {
    return this.store$.pipe(select(getVehicleById(vehicleId)));
  }

  public getLoadingState$(): Observable<boolean> {
    return this.store$.pipe(
      select(selectLoadingState),
      map(loadingState => !!loadingState));
  }

  public loadDrivers(): void {
    this.backendService.getRequest$(API_URL).pipe(
      take(1),
      tap((driversAndVehicles: DriversAndVehiclesInterface) => this.store$.dispatch(new SetDriversAndVehicles(driversAndVehicles))),
      tap(() => this.store$.dispatch(new LoadedSucessfully())),
    ).subscribe();
  }

  public setDriver(driver: DriverInterface): void {
    this.store$.dispatch(new SetDriver(driver));
  }

  public deleteDriver(driverId: string): void {
    this.store$.dispatch(new DeleteDriver({ id: driverId }));
  }

}
