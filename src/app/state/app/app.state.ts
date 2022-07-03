import {
  driversAndVehiclesInitialState,
  DriversAndVehiclesState
} from "../drivers-and-vehicles/drivers-and-vehicles.state";

export interface AppState {
  driverAndVehicles: DriversAndVehiclesState;
}

export const appInitialState: AppState = {
  driverAndVehicles: driversAndVehiclesInitialState,
}

export function getInitialState(): AppState {
  return appInitialState;
}
