export interface DriverInterface {
  id: string,
  name: string,
  surname: string,
  email: string,
  birthDate: string,
  active: boolean,
  vehicleId?: string,
}
