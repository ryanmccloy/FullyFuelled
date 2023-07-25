"use strict";

// Google API

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
