"use strict";

// Imports
import HeroView from "./HeroView.js";

// Instantiate
const heroView = new HeroView();

// Handlers
const showSignUpModelHandler = function () {
  heroView.SignUpModel.classList.remove("hidden");
  heroView.Overlay.classList.remove("hidden");
};

const showLogInModelHandler = function () {
  heroView.LogInModel.classList.remove("hidden");
  heroView.Overlay.classList.remove("hidden");
};

///////////////

heroView.showSignUpModel(showSignUpModelHandler);
heroView.showLogInModel(showLogInModelHandler);
heroView.initializeEventListeners();
