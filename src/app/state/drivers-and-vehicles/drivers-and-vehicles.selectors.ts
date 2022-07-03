import {AppState} from "../app/app.state";
import {createSelector} from "@ngrx/store";
import {DriversAndVehiclesState} from "./drivers-and-vehicles.state";
import {DriverInterface} from "../../interfaces/driver.interface";
import {VehicleInterface} from "../../interfaces/vehicle.interface";

const selectDriversAndVehicles = (state: AppState) => state.driverAndVehicles;

export const selectDrivers = createSelector(
  selectDriversAndVehicles,
  (state: DriversAndVehiclesState) => state.drivers,
)

export const selectLoadingState = createSelector(
  selectDriversAndVehicles,
  (state: DriversAndVehiclesState) => state.isLoaded,
)

export const getDriverById = (id: string) =>
  createSelector(selectDrivers, (drivers: DriverInterface[]) => drivers.find(driver => driver.id === id));

export const selectVehicles = createSelector(
  selectDriversAndVehicles,
  (state: DriversAndVehiclesState) => state.vehicles,
)

export const getVehicleById = (id: string) =>
  createSelector(selectVehicles, (vehicles: VehicleInterface[]) => vehicles.find(vehicle => vehicle.id === id));
