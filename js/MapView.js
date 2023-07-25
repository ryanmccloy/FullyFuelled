"use strict";

// Google API
const MAP_API = "AIzaSyDD3U4qeMcJC1qncMwsD_MAkBzY9erb8DE";

// Variables
const Map = document.querySelector(".map");
const MapBox = document.querySelector(".map-box");
const MapInput = document.querySelector(".search-bar");
const SearchBtn = document.querySelector(".search-button");

export default class MapView {
  constructor() {
    this.Map = Map;
    this.MapBox = MapBox;
    this.MapInput = MapInput;
    this.SearchBtn = SearchBtn;
  }

  showMapBox(handler) {
    this.SearchBtn.addEventListener("click", handler);
  }
}
