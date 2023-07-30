"use strict";

// Imports
import HeroView from "./HeroView.js";
import MapView from "./MapView.js";
import MAPS_API_KEY from "./Config.js";

// Instantiate
const heroView = new HeroView();
const mapView = new MapView();

// Controller Class

export default class Controller {
  constructor() {
    // Handlers
    this.showSignUpModelHandler = this.showSignUpModelHandler.bind(this);
    this.showLogInModelHandler = this.showLogInModelHandler.bind(this);
    this.showMapBoxHandler = this.showMapBoxHandler.bind(this);
    this.resetHeroSectionHandler = this.resetHeroSectionHandler.bind(this);
  }

  // Event Handlers
  showSignUpModelHandler = function () {
    heroView.SignUpModel.classList.remove("hidden");
    heroView.Overlay.classList.remove("hidden");
  };

  showLogInModelHandler = function () {
    heroView.LogInModel.classList.remove("hidden");
    heroView.Overlay.classList.remove("hidden");
  };

  showMapBoxHandler = function (event) {
    event.preventDefault();
    mapView.MapBox.classList.remove("hidden");
    document.body.classList.add("map-box-visible");
  };

  resetHeroSectionHandler = function () {
    mapView.MapBox.classList.add("hidden");
    document.body.classList.remove("map-box-visible");
  };

  // Initialize the event listeners
  initializeEventListeners() {
    heroView.showSignUpModel(this.showSignUpModelHandler);
    heroView.showLogInModel(this.showLogInModelHandler);
    heroView.resetHeroSection(this.resetHeroSectionHandler);
    mapView.showMapBox(this.showMapBoxHandler);
  }

  // Dynamically load the Google Maps API
  loadGoogleMapsAPI() {
    window.initMap = this.initMap.bind(this);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    console.log("api");
  }

  // Initialize map
  initMap() {
    this.map = new google.maps.Map(mapView.Map, {
      center: { lat: 51.1784, lng: -115.5708 },
      zoom: 12,
    });
    console.log(controller.map);
  }
}

//////////////

const controller = new Controller();
controller.loadGoogleMapsAPI();
controller.initializeEventListeners();
heroView.initializeEventListeners();
