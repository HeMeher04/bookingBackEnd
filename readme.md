Booking system
This booking system focusing on trip booking for a budget friendly travel.

### Features

`src` -> Inside the src folder all the actual source code regarding the project will reside.

Lets take a look inside the `src` folder

- `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done.

- `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

- `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

- `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

- `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the queries will go here.

- `services` -> contains the buiness logic and interacts with repositories for data from the database

- `utils` -> contains helper methods, error classes etc.

### Setup the project

- Go inside the folder path and execute the following command:

```
npm install
```

- In the root directory create a `.env` file and add the following env variables

  ```
      PORT=<port number of your choice>
      URI= mongodb cluster link
      DB_NAME=
        other
  ```

  ex:

  ```
      PORT=3000
  ```

- To run the server execute

```
npm run dev
```
