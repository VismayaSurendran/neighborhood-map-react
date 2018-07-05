# Neighborhood Map Using React

Neighborhood Map App is built using React. It displays the points of Restaurants and Cafe nearby Calicut City (Kerala,India). Additional information about the location can be viewed from **FOURSQUARE** site by clicking on link in the infowindow.

### How to load (in Development Mode)

* Clone/Download the repository.
* cd to the folder.
* Now install all the node modules listed as dependencies in **package.json** by running the command `npm install` in the terminal.
* Then type  `npm start` for launching the App in the browser.
 * The webpage will be opened in  `localhost:3000`
 * If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

 ### Offline use
* The service worker is only enabled in the production mode.
* It is recommended  not to enable an offline-first service worker in a development environment.
* To test it offline locally, build the application (using `npm run build`) and run a simple http server from your build directory.
* Deploy it to `gh-pages` branch by `npm run deploy`
* More information [Here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#offline-first-considerations)

### How to use the app
The map contains 10 locations with clickable markers. It also has a sidebar menu and search option. Click on markers to open the infowindow about that particular location. User can also select the places from side menu and get the details. Infowindow contains the url of foursquare site which fetch the details of the location.
#### Technologies used
- ReactJs
- HTML
- CSS
- Foursquare API
- Google Maps API