"use strict";

// Imports
import HeroView from "./HeroView.js";
import MapView from "./MapView.js";
import MAPS_API_KEY from "./Config.js";

// Instantiate
const heroView = new HeroView();
const mapView = new MapView();

// Handlers
const showSignUpModelHandler = function () {
  heroView.SignUpModel.classList.remove("hidden");
  heroView.Overlay.classList.remove("hidden");
};

const showLogInModelHandler = function () {
  heroView.LogInModel.classList.remove("hidden");
  heroView.Overlay.classList.remove("hidden");
};

const showMapBoxHandler = function (event) {
  event.preventDefault();
  mapView.MapBox.classList.remove("hidden");
  document.body.classList.add("map-box-visible");
};

const resetHeroSectionHandler = function () {
  mapView.MapBox.classList.add("hidden");
  document.body.classList.remove("map-box-visible");
};

// Controller Class

export default class Controller {}

/////////////// Hero

heroView.showSignUpModel(showSignUpModelHandler);
heroView.showLogInModel(showLogInModelHandler);
heroView.resetHeroSection(resetHeroSectionHandler);
heroView.initializeEventListeners();

////////////// Map

mapView.showMapBox(showMapBoxHandler);
