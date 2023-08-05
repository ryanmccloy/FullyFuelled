"use strict";

// Variables
const SignUpButton = document.querySelector(".sign-up");
const LogInButton = document.querySelector(".log-in");
const SignUpModel = document.querySelector(".sign-up-model");
const LogInModel = document.querySelector(".log-in-model");
const Overlay = document.querySelector(".overlay");
const Logo = document.querySelector(".logo");
const SignUpForm = document.querySelector(".sign-up-form");
const MyTripsButton = document.querySelector(".my-trips-link");
const SignOutButton = document.querySelector(".sign-out-link");

export default class HeroView {
  constructor() {
    this.SignUpButton = SignUpButton;
    this.LogInButton = LogInButton;
    this.SignUpModel = SignUpModel;
    this.LogInModel = LogInModel;
    this.Overlay = Overlay;
    this.Logo = Logo;
    this.SignUpForm = SignUpForm;
    this.MyTripsButton = MyTripsButton;
    this.SignOutButton = SignOutButton;
  }

  // Resetting Hero Section
  resetHeroSection(handler) {
    this.Logo.addEventListener("click", handler);
  }

  // Showing Sign Up Model
  showSignUpModel(handler) {
    this.SignUpButton.addEventListener("click", handler);
  }

  // Closing Sign Up Model
  closeSignUpModel() {
    this.SignUpModel.classList.add("hidden");
    this.Overlay.classList.add("hidden");
  }

  // Showing Log In Model
  showLogInModel(handler) {
    this.LogInButton.addEventListener("click", handler);
  }

  // Closing Log In Model
  closeLogInModel() {
    this.LogInModel.classList.add("hidden");
    this.Overlay.classList.add("hidden");
  }

  // Showing My Trips Model

  // Closing My Trips Model

  // Initialize Event Listeners
  initializeEventListeners() {
    // Close Models Using Overlay
    this.Overlay.addEventListener("click", () => this.closeSignUpModel());
    this.Overlay.addEventListener("click", () => this.closeLogInModel());

    // Close Models Using Escape Key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeSignUpModel();
        this.closeLogInModel();
      }
    });
  }

  // Change nav bar when signed in
  updateNavBar(isLoggedIn) {
    if (isLoggedIn) {
      this.SignUpButton.classList.add("hidden");
      this.LogInButton.classList.add("hidden");
      this.MyTripsButton.classList.remove("hidden");
      this.SignOutButton.classList.remove("hidden");
    } else {
      this.SignUpButton.classList.remove("hidden");
      this.LogInButton.classList.remove("hidden");
      this.MyTripsButton.classList.add("hidden");
      this.SignOutButton.classList.add("hidden");
    }
  }

  // User signing up
  handleSignUpForm(handler) {
    SignUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.querySelector(".sign-up-email").value;
      const password = document.querySelector(".sign-up-password").value;
      handler(email, password);
      this.closeSignUpModel();
      this.updateNavBar(true);
    });
  }
}
