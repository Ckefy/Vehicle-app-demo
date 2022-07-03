# DriversVehiclesApp

This project implements list of Drivers with their vehicles, provided via mock. The state of app maintaining with **NgRx** (implementation of Redux pattern in Angular). **Angular material library** used for almost all components in app, for mocking API-requests library `json-server` was used. If the json-server is not available, the hard-coded mock will be used.

## App features

**Basic CRUD operations**:
+ Display an overview in which all the driver data is represented, except for the id.
+ Make it possible to create, edit and delete drivers.
+ Display in the overview the license plate number of the vehicle associated
to each driver.
+ Allow the change of vehicle associated to each driver.
+ Apply validation to the form.

## Development server

Run `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if any source file was changed.

Also, run `json-server --watch db.json` to mock API-requests. It will serve database-server on `http://localhost:3000/` and will return json file with mock via API-request on `http://localhost:3000/data`
