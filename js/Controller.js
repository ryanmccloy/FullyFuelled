"use strict";

// Imports
import HeroView from "./HeroView.js";
import MapView from "./MapView.js";
import User from "./Model.js";
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
    this.signupUserHandler = this.signupUserHandler.bind(this);
    this.logInUserHandler = this.logInUserHandler.bind(this);
    this.signOutUserHandler = this.signOutUserHandler.bind(this);
    this.currentUser;
    this.signedin = false;
    this.markersArray = [];
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

  showMyTripsModelHandler = function () {
    heroView.TripModel.classList.remove("hidden");
    heroView.Overlay.classList.remove("hidden");
  };

  showMapBoxHandler = function (event) {
    event.preventDefault();

    // Get location from input
    const location = document.querySelector(".search-bar").value;

    // Coords of Input
    this.mapGeocoder(location);

    if (this.signedin && !this.currentUser.trips.includes(location)) {
      this.currentUser.trips.push(location);
      const usersJson = localStorage.getItem("users");
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Find the index of the currentUser in the users array
      const index = users.findIndex(
        (user) => user.email === this.currentUser.email
      );
      if (index !== -1) {
        users[index] = this.currentUser; // Replace the old data with the updated one
        localStorage.setItem("users", JSON.stringify(users)); // Save back to localStorage
      }

      this.tripBoxAppend(location);
    }
  }.bind(this);

  mapGeocoder(location) {
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

    mapView.MapBox.classList.remove("hidden");
    document.body.classList.add("map-box-visible");
  }

  resetHeroSectionHandler = function () {
    document.querySelector(".search-bar").value = "";
    this.map.setZoom(3);
    mapView.MapBox.classList.add("hidden");
    document.body.classList.remove("map-box-visible");
  };

  signupUserHandler(email, password) {
    const usersJson = localStorage.getItem("users");
    const users = usersJson ? JSON.parse(usersJson) : [];
    const user = new User(email, password);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    this.currentUser = user;
    this.signedin = true;
    console.log(this.currentUser);
    console.log(this.signedin);
  }

  logInUserHandler(email, password) {
    const usersJson = localStorage.getItem("users");
    let users = [];

    if (usersJson !== null) {
      users = JSON.parse(usersJson);
      console.log(users);
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      this.currentUser = user;
      heroView.closeLogInModel();
      heroView.updateNavBar(true);
      console.log(this.currentUser);
    } else {
      prompt("Account not found, please create one! ✈️");
    }
    this.signedin = true;
    this.addUserMarker(this.currentUser);

    // Displaying trips in my trips

    this.currentUser.trips.forEach((trip) => {
      this.tripBoxAppend(trip);
    });
  }

  signOutUserHandler = function () {
    heroView.updateNavBar(false);
    this.resetHeroSectionHandler();
    this.currentUser = null;
    this.signedin = false;
    document.querySelector(".trip-box").innerHTML = "";
    this.clearAllMarkers();
    this.resetMap();
  };

  // Initialize the event listeners
  initializeEventListeners() {
    heroView.showSignUpModel(this.showSignUpModelHandler);
    heroView.showLogInModel(this.showLogInModelHandler);
    heroView.resetHeroSection(this.resetHeroSectionHandler);
    heroView.showMyTripsModel(this.showMyTripsModelHandler);
    heroView.handleSignUpForm(this.signupUserHandler);
    heroView.handleLogInForm(this.logInUserHandler);
    heroView.handleSignOut(this.signOutUserHandler);
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
    this.markersArray.push(marker);
    console.log(marker);

    // Store user's input for this marker
    let userInput = "";

    // Create an InfoWindow
    const infowindow = new google.maps.InfoWindow();

    // Function to set the InfoWindow content to a form with the user's input
    const setInfoWindowForm = () => {
      infowindow.setContent(`
      
      <form id="marker-form">
          <textarea id="marker-input" type="text" placeholder="Start Planning...">${userInput}</textarea>
          <input id="info-save" type="submit" value="Save" />
          <button id="deleteMarker">Remove Stop</button>
      </form>
      
      `);
    };

    // Set the InfoWindow content initially
    setInfoWindowForm();

    // Open the info window immediately
    infowindow.open(this.map, marker);

    // Listen for the form submit event in the InfoWindow
    google.maps.event.addListener(infowindow, "domready", () => {
      document.getElementById("marker-form").addEventListener("submit", (e) => {
        e.preventDefault();
        // Get the user's input
        userInput = document.getElementById("marker-input").value;
        // Set the InfoWindow's content to the user's input
        infowindow.setContent(userInput);
        // Close the infowindow
        infowindow.close();

        // Storing markers to users local storage
        if (this.signedin) {
          this.currentUser.markers.push({
            position: {
              lat: location.lat(),
              lng: location.lng(),
            },
            content: userInput,
          });
          console.log(this.currentUser);
          const usersJson = localStorage.getItem("users");
          const users = usersJson ? JSON.parse(usersJson) : [];

          // Find the index of the currentUser in the users array
          const index = users.findIndex(
            (user) => user.email === this.currentUser.email
          );
          if (index !== -1) {
            users[index] = this.currentUser; // Replace the old data with the updated one
            localStorage.setItem("users", JSON.stringify(users)); // Save back to localStorage
          }
        }
      });

      document.getElementById("deleteMarker").addEventListener("click", () => {
        marker.setMap(null);
      });
    });

    // Add a click listener to the marker to open the InfoWindow
    marker.addListener("click", () => {
      setInfoWindowForm();
      infowindow.open(this.map, marker);
    });
  }

  clearAllMarkers() {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(null);
    }
    this.markersArray.length = 0;
  }

  resetMap() {
    this.map.setCenter({ lat: 51.1784, lng: -115.5708 });
    this.map.setZoom(3);
  }

  tripBoxAppend = function (trip) {
    const tripDiv = document.createElement("div");
    tripDiv.className = "trip";
    const tripSpan = document.createElement("span");
    tripSpan.textContent = trip;

    tripDiv.appendChild(tripSpan);
    //////////////
    tripDiv.addEventListener("click", () => {
      const myTrip = tripSpan.textContent;
      this.mapGeocoder(myTrip);
      heroView.closeMyTripsModel();
    });
    ///////////
    document.querySelector(".trip-box").appendChild(tripDiv);
  };

  addUserMarker(curUser) {
    const curUserMarkers = [...curUser.markers];

    for (let i = 0; i < curUserMarkers.length; i++) {
      ///////////
      const marker = new google.maps.Marker({
        position: curUserMarkers[i].position,
        map: this.map,
      });
      this.markersArray.push(marker);

      // Store user's input for this marker
      let userInput = "";

      // Create an InfoWindow
      const infowindow = new google.maps.InfoWindow();

      // Function to set the InfoWindow content to a form with the user's input
      const setInfoWindowForm = () => {
        infowindow.setContent(`

        <form id="marker-form">
            <textarea id="marker-input" type="text" placeholder="Start Planning...">${curUserMarkers[i].content}</textarea>
            <input id="info-save" type="submit" value="Save" />
            <button id="deleteMarker">Remove Stop</button>
        </form>

        `);
      };

      // Set the InfoWindow content initially
      setInfoWindowForm();

      // Listen for the form submit event in the InfoWindow
      google.maps.event.addListener(infowindow, "domready", () => {
        document
          .getElementById("marker-form")
          .addEventListener("submit", (e) => {
            e.preventDefault();
            // Get the user's input
            userInput = document.getElementById("marker-input").value;
            // Set the InfoWindow's content to the user's input
            infowindow.setContent(userInput);
            // Close the infowindow
            infowindow.close();

            // Storing markers to users local storage
            if (this.signedin) {
              this.currentUser.markers.push({
                position: this.markersArray[i].position,
                content: userInput,
              });
              const usersJson = localStorage.getItem("users");
              const users = usersJson ? JSON.parse(usersJson) : [];

              // Find the index of the currentUser in the users array
              const index = users.findIndex(
                (user) => user.email === this.currentUser.email
              );
              if (index !== -1) {
                users[index] = this.currentUser; // Replace the old data with the updated one
                localStorage.setItem("users", JSON.stringify(users)); // Save back to localStorage
              }
            }
          });

        document
          .getElementById("deleteMarker")
          .addEventListener("click", (e) => {
            e.preventDefault();
            marker.setMap(null);

            // Identify and remove the marker data from curUserMarkers
            const markerIndex = curUserMarkers.findIndex(
              (m) =>
                m.position.lat === marker.getPosition().lat() &&
                m.position.lng === marker.getPosition().lng()
            );

            if (markerIndex !== -1) {
              curUserMarkers.splice(markerIndex, 1);
            }

            // Update currentUser.markers

            this.currentUser.markers = curUserMarkers;

            // Update the local storage
            const usersJson = localStorage.getItem("users");
            const users = usersJson ? JSON.parse(usersJson) : [];

            // Find the index of the currentUser in the users array
            const userIndex = users.findIndex(
              (user) => user.email === this.currentUser.email
            );
            if (userIndex !== -1) {
              users[userIndex] = this.currentUser; // Replace the old data with the updated one
              localStorage.setItem("users", JSON.stringify(users)); // Save back to localStorage
            }
          });
      });

      // Add a click listener to the marker to open the InfoWindow
      marker.addListener("click", () => {
        setInfoWindowForm();
        infowindow.open(this.map, marker);
      });
    }
  }
}

//////////////

const controller = new Controller();
controller.loadGoogleMapsAPI();
controller.initializeEventListeners();
heroView.initializeEventListeners();
