"use strict";

// Variables
const SignUpButton = document.querySelector(".sign-up");
const LogInButton = document.querySelector(".log-in");
const SignUpModel = document.querySelector(".sign-up-model");
const LogInModel = document.querySelector(".log-in-model");
const Overlay = document.querySelector(".overlay");

export default class HeroView {
  constructor() {
    this.SignUpButton = SignUpButton;
    this.LogInButton = LogInButton;
    this.SignUpModel = SignUpModel;
    this.LogInModel = LogInModel;
    this.Overlay = Overlay;
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

  // Initialize Event Listeners
  initializeEventListeners() {
    // Close Sign Up Model Using Overlay
    this.Overlay.addEventListener("click", () => this.closeSignUpModel());

    // Close Sign Up Model Using Escape Key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeSignUpModel();
      }
    });
  }
}
