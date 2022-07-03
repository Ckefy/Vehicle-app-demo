import {Action} from "@ngrx/store";
import {DriverInterface} from "../../interfaces/driver.interface";
import {VehicleInterface} from "../../interfaces/vehicle.interface";
import {DriversAndVehiclesInterface} from "../../interfaces/drivers-and-vehicles.interface";

export enum DriversAndVehiclesActionsTypes {
  LOADED_SUCCESSFULLY = '[Drivers and Vehicles] Drivers and vehicles loaded successfully',
  SET_DRIVERS_AND_VEHICLES = '[Drivers and Vehicles] Set drivers and vehicles',
  SET_DRIVER = '[Drivers and Vehicles] Set driver',
  SET_VEHICLES = '[Drivers and Vehicles] Set vehicles',
  DELETE_DRIVER = '[Drivers and Vehicles] Delete driver'
}

export class LoadedSucessfully implements Action {
  public readonly type = DriversAndVehiclesActionsTypes.LOADED_SUCCESSFULLY;
}

export class SetDriversAndVehicles implements Action {
  public readonly type = DriversAndVehiclesActionsTypes.SET_DRIVERS_AND_VEHICLES;

  constructor(public payload: DriversAndVehiclesInterface) {
  }
}

export class SetDriver implements Action {
  public readonly type = DriversAndVehiclesActionsTypes.SET_DRIVER;

  constructor(public payload: DriverInterface) {
  }
}

export class SetVehicles implements Action {
  public readonly type = DriversAndVehiclesActionsTypes.SET_VEHICLES;

  constructor(public payload: VehicleInterface[]) {
  }
}

export class DeleteDriver implements Action {
  public readonly type = DriversAndVehiclesActionsTypes.DELETE_DRIVER;

  constructor(public payload: { id: string }) {
  }
}

export type DriversAndVehiclesActions =
  | LoadedSucessfully
  | SetDriversAndVehicles
  | SetDriver
  | SetVehicles
  | DeleteDriver;
