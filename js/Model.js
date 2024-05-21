"use strict";

export default class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.trips = [];
    this.markers = [];
  }

  addTrip(trip) {
    this.trips.push(trip);
  }

  addMarker(marker) {
    this.markers.push(marker);
  }

  removeMarker(removeMarker) {
    this.markers = this.markers.filter((marker) => marker !== removeMarker);
  }
}
