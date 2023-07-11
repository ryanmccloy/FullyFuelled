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

///////////////

heroView.showSignUpModel(showSignUpModelHandler);
heroView.initializeEventListeners();
