# FullyFuelled

This is a travel planning app that utilizes the Google Maps API. It was built using vanilla JavaScript

# How to View and Test the Project

To view and test this project locally, follow these steps:

1. **Download the Repository**:

   - Download the repository from GitHub:
     - Click the "Code" button and select "Download ZIP".

2. **Install Dependencies**:

   - Run the following command to install `live-server`:
     - `npm install`

3. **Set Up Google Maps API Key**:

   - Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a file named `Config.js` in the root directory of the project.
   - Add your Google Maps API key to the `Config.js` file as follows:
     ```javascript
     const MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";
     export default MAPS_API_KEY;
     ```

4. **Start the Development Server**:

   - Start the development server:
     - `npm start`
   - This command will start a live server on `http://localhost:8080` (or another port if 8080 is in use).

5. **View the Application**:
   - Open your web browser and navigate to `http://localhost:8080` to view and test the application.

By following these steps, you will be able to view and test the project locally with your own Google Maps API key.

# Travel Planner 🌍

A web application that helps users plan their trips by allowing them to search for locations, mark them on a map, and make notes about each location.

# Features 🚀

User Authentication: Sign up, log in, and sign out functionality.
Dynamic Map Integration: Allows users to search for a location and view it on a map.
Interactive Map: Users can click on the map to add markers and make notes about specific locations.
Personalized Experience: Registered users can save their trip plans and markers for future reference.
