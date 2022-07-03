import {DriverInterface} from "../../interfaces/driver.interface";
import {VehicleInterface} from "../../interfaces/vehicle.interface";

export interface DriversAndVehiclesState {
  drivers: DriverInterface[];
  vehicles: VehicleInterface[];
  isLoaded?: boolean;
}

export const driversAndVehiclesInitialState: DriversAndVehiclesState = {
  drivers: [],
  vehicles: []
}
