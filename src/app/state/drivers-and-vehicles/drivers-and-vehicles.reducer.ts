import {driversAndVehiclesInitialState, DriversAndVehiclesState} from "./drivers-and-vehicles.state";
import {DriversAndVehiclesActions, DriversAndVehiclesActionsTypes} from "./drivers-and-vehicles.actions";

export function driversAndVehiclesReducers(state = driversAndVehiclesInitialState, action: DriversAndVehiclesActions): DriversAndVehiclesState {
  switch (action.type) {
    case DriversAndVehiclesActionsTypes.LOADED_SUCCESSFULLY:
      return {
        ...state,
        isLoaded: true,
      }
    case DriversAndVehiclesActionsTypes.SET_DRIVERS_AND_VEHICLES:
      return {
        ...state,
        drivers: action.payload.drivers,
        vehicles: action.payload.vehicles,
      }
    case DriversAndVehiclesActionsTypes.SET_DRIVER:
      // to keep order as it was
      const oldDriverPosition = state.drivers.findIndex(({id}) => id === action.payload.id);
      const newDrivers = [...state.drivers.filter(({id}) => id !== action.payload.id)];

      if (oldDriverPosition !== -1) {
        newDrivers.splice(oldDriverPosition, 0, action.payload);
      } else {
        newDrivers.push(action.payload);
      }

      return {
        ...state,
        drivers: newDrivers,
      }
    case DriversAndVehiclesActionsTypes.SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      }
    case DriversAndVehiclesActionsTypes.DELETE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers.filter(({id}) => id !== action.payload.id)],
      }
    default:
      return state;
  }
}
