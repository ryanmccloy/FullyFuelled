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

    // Get location from input
    const location = document.querySelector(".search-bar").value;

    // Coords of Input
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        // Set maps centre to geocoding result
        const mapLocation = results[0].geometry.location;
        this.map.panTo(mapLocation);

        setTimeout(() => {
          this.map.setZoom(13);
        }, 1500);
      } else {
        alert(`Couldn't find location! Status: ${status}`);
      }
    });

    // Manipulate CSS
    mapView.MapBox.classList.remove("hidden");
    document.body.classList.add("map-box-visible");
  }.bind(this);

  resetHeroSectionHandler = function () {
    document.querySelector(".search-bar").value = "";
    this.map.setZoom(3);
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
  }

  // Initialize map
  initMap() {
    this.map = new google.maps.Map(mapView.Map, {
      center: { lat: 51.1784, lng: -115.5708 },
      zoom: 3,
    });
  }
}

//////////////

const controller = new Controller();
controller.loadGoogleMapsAPI();
controller.initializeEventListeners();
heroView.initializeEventListeners();
