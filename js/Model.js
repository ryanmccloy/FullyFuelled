"use strict";

export default class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.trips = [];
  }

  addTrip(trip) {
    this.trips.push(trip);
  }
}
