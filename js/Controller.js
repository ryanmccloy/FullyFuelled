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

    // Event listener for map
    this.map.addListener("click", (event) => {
      this.addMarker(event.latLng);
    });
  }

  // Add marker on map
  addMarker(location) {
    // Create a marker
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });

    // Store user's input for this marker
    let userInput = "";

    // Create an InfoWindow
    const infowindow = new google.maps.InfoWindow();

    // Function to set the InfoWindow content to a form with the user's input
    const setInfoWindowForm = () => {
      infowindow.setContent(`
      <form id="markerForm">
          <input id="markerInput" type="text" placeholder="Start planning..." value="${userInput}" />
          <input type="submit" value="Save" />
      </form>
      `);
    };

    // Set the InfoWindow content initially
    setInfoWindowForm();

    // Open the info window immediately
    infowindow.open(this.map, marker);

    // Listen for the form submit event in the InfoWindow
    google.maps.event.addListener(infowindow, "domready", () => {
      document.getElementById("markerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        // Get the user's input
        userInput = document.getElementById("markerInput").value;
        // Set the InfoWindow's content to the user's input
        infowindow.setContent(userInput);
      });
    });

    // Add a click listener to the marker to open the InfoWindow
    marker.addListener("click", () => {
      setInfoWindowForm();
      infowindow.open(this.map, marker);

      // Add a delete button to the form
      infowindow.setContent(
        infowindow.getContent() +
          '<button id="deleteMarker">Remove Stop</button>'
      );

      // When InfoWindow is ready, add a click listener to the delete button
      google.maps.event.addListener(infowindow, "domready", () => {
        document
          .getElementById("deleteMarker")
          .addEventListener("click", () => {
            marker.setMap(null);
          });
      });
    });
  }
}

//////////////

const controller = new Controller();
controller.loadGoogleMapsAPI();
controller.initializeEventListeners();
heroView.initializeEventListeners();
