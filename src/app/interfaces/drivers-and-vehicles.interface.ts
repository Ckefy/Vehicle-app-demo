import {DriverInterface} from "./driver.interface";
import {VehicleInterface} from "./vehicle.interface";

export interface DriversAndVehiclesInterface {
  drivers: DriverInterface[],
  vehicles: VehicleInterface[],
}
