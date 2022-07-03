import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./app.state";
import {driversAndVehiclesReducers} from "../drivers-and-vehicles/drivers-and-vehicles.reducer";

export const appReducers: ActionReducerMap<AppState, any> = {
  driverAndVehicles: driversAndVehiclesReducers,
}
