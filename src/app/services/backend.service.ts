import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {DriversAndVehiclesInterface} from "../interfaces/drivers-and-vehicles.interface";

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {
  }

  public getRequest$(url: string): Observable<DriversAndVehiclesInterface> {
    return this.http.get<DriversAndVehiclesInterface>(url).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
          console.error('Error with json-server, please execute "json-server --watch db.json"');
          console.error('I will use hard-coded mock');

          return of(this.reserveMock);
        }
      ),
    );
  }

  readonly reserveMock: DriversAndVehiclesInterface = {
    "drivers": [
      {
        "id": "1",
        "name": "Max",
        "surname": "Wayne",
        "email": "a.one@gmail.de",
        "birthDate": "1970-04-23T00:00:00.000Z",
        "active": true,
        "vehicleId": "11"
      },
      {
        "id": "2",
        "name": "Seo",
        "surname": "Nülo",
        "email": "seo@gmail.de",
        "birthDate": "1968-10-28T00:00:00.000Z",
        "active": false,
        "vehicleId": "3"
      },
      {
        "id": "3",
        "name": "Jens",
        "surname": "Reno",
        "email": "j.reno@gmail.de",
        "birthDate": "1968-10-28T00:00:00.000Z",
        "active": true,
        "vehicleId": "7"
      },
      {
        "id": "4",
        "name": "John",
        "surname": "Müller",
        "email": "john@gmail.de",
        "birthDate": "1975-09-13T00:00:00.000Z",
        "active": true,
        "vehicleId": "12"
      },
      {
        "id": "5",
        "name": "Deos",
        "surname": "Meyer",
        "email": "deos@gmail.de",
        "birthDate": "1982-05-10T00:00:00.000Z",
        "active": false
      },
      {
        "id": "6",
        "name": "Marina",
        "surname": "Sadio",
        "email": "m.sadio@gmail.de",
        "birthDate": "1979-02-12T00:00:00.000Z",
        "active": true
      }
    ],
    "vehicles": [
      {
        "id": "1",
        "registrationNumber": "GERM001",
        "vehicleType": "Tank truck",
        "fuelType": "Gasoline"
      },
      {
        "id": "2",
        "registrationNumber": "GERM002",
        "vehicleType": "Tractor unit",
        "fuelType": "Diesel"
      },
      {
        "id": "3",
        "registrationNumber": "GERM003",
        "vehicleType": "Tank truck",
        "fuelType": "Gasoline"
      },
      {
        "id": "4",
        "registrationNumber": "GERM004",
        "vehicleType": "Tractor unit",
        "fuelType": "Diesel"
      },
      {
        "id": "5",
        "registrationNumber": "GERM005",
        "vehicleType": "Tractor unit",
        "fuelType": "Diesel"
      },
      {
        "id": "6",
        "registrationNumber": "GERM006",
        "vehicleType": "Tractor unit",
        "fuelType": "Gasoline"
      },
      {
        "id": "7",
        "registrationNumber": "GERM007",
        "vehicleType": "Tractor unit",
        "fuelType": "Diesel"
      },
      {
        "id": "8",
        "registrationNumber": "GERM008",
        "vehicleType": "Tractor unit",
        "fuelType": "Diesel"
      },
      {
        "id": "9",
        "registrationNumber": "GERM009",
        "vehicleType": "Tractor unit",
        "fuelType": "Gasoline"
      },
      {
        "id": "10",
        "registrationNumber": "GERM010",
        "vehicleType": "Refrigerator truck",
        "fuelType": "Diesel"
      },
      {
        "id": "11",
        "registrationNumber": "GERM011",
        "vehicleType": "Tank truck",
        "fuelType": "Gasoline"
      },
      {
        "id": "12",
        "registrationNumber": "GERM012",
        "vehicleType": "Refrigerator truck",
        "fuelType": "Diesel"
      }
    ]
  }
}
