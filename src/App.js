

import React, {Component} from 'react';
import List from './files/List';

class App extends Component {
  
  state = {
     allPlaces: require("./locations.json"), //getting the places from locations.json file
         
    map: '',
    markers: [],
    prev: [],  //prev marker
    infowindow: '',
   
  }

  //loading map with google API
  componentDidMount(){
    
    window.initMap = this.initMap;
   mapLoad('https://maps.googleapis.com/maps/api/js?key=AIzaSyBH3wHqNnJZiuMCD1NhAGbgFF8xmVD1ah8&callback=initMap')
  }
  
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 11.259550,
        lng: 75.776057
      },
      zoom: 15
    });

    var locationArray = [];
    this.setState({
      map: map
    })

   
    var latlngbnd = new window.google.maps.LatLngBounds();
    //setting up of markers
    this.state.allPlaces.forEach(places => {
      var marker = new window.google.maps.Marker({
        position: {
          lat: places.latitude,
          lng: places.longitude
        },
        fullname: places.name,
        map: map,        
        animation: window.google.maps.Animation.DROP
      })

      locationArray.push(marker);
      var extension = new window.google.maps.LatLng(marker.position.lat(), marker.position.lng());

      latlngbnd.extend(extension);      
      //open infowindow on marker click
      window.google.maps.event.addListener(marker,'click',()=> {
        this.openInfoWindow(marker);
      })
    })
      this.setState({
      markers: locationArray,
      prev: locationArray
    })

    var middlePos = map.getCenter();
    window.google.maps.event.addDomListener(window, 'resize', ()=> {
      this.state.map.setCenter(middlePos);
      this.state.map.fitBounds(latlngbnd);
      this.state.map.panToBounds(latlngbnd);

    });

   

    var infowindow = new window.google.maps.InfoWindow({ maxWidth: 250 });
    this.setState({
      infowindow:infowindow
    })


  }
  
  openInfoWindow = (marker) => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 800);
   
    this.state.map.setCenter(marker.getPosition());
    //foursquare details
    var clientID = "UWWIORSH0WIMJXSYCCALKZ0PCO2PHHLA0JJS2VD22LMWMWBT";
    var clientSECRET = "UCWLVB1HQ2C12G5TWAHTHUGSAUWW1MPQY3FWRGTQKUZG1YHP";
    
    var url = "https://api.foursquare.com/v2/venues/search?client_id=" + 
    clientID + 
    "&client_secret=" + 
    clientSECRET + 
    "&v=20180101&ll=" + 
    marker.getPosition().lat() + "," + 
    marker.getPosition().lng() + "";

    this.state.infowindow.setContent("Loading..")
    //fetch the url
    fetch(url)
      .then((res)=>{
        if (res.status !== 200) {
          this.state.infowindow.setContent('Sorry cannot load the details.');
          return;
        }
        res.json()
          .then((data) => {
            
            var content = data.response.venues[0];
           
            fetch("https://api.foursquare.com/v2/venues/" + content.id + "/?client_id=" + clientID + "&client_secret=" + clientSECRET + "&v=20180516")
              .then((resp) => {
                resp.json()
                  .then(data=>{
                    var place = data.response.venue;
                    var heading="";
                    if(place.name){
                    	heading=place.name;
                    }
                    var contact="";
                    if (place.contact && place.contact.phone) {
                    contact = place.contact.phone;
                }
                    
                    var moreAbout = '<a href="https://foursquare.com/v/'+ place.id +'"target="_blank"><b>Checkout for more details</b></a>';
                    console.log(place);  
                    //infowindow contents                 
                    this.state.infowindow.setContent(`<b>${heading}</b><br><b>Tips :</b> ${place.tips.count}<br><b>Likes:</b> ${place.likes.count} <br> <b>Phone: </b>${contact} <br> ${moreAbout}`)
                  })
              })
              .catch(function (err){
                this.state.infowindow.setContent("Sorry cannot load the details.");
              });
          })
      })
      .catch(function (err){
        this.state.infowindow.setContent("Sorry cannot load the details.");
      });

    this.state.infowindow.open(this.state.map,marker);
  }
  //search input of locations
  searchQuery = (e) => {
    this.state.infowindow.close();
    var searchArray = [];
    if (e.target.value === '' || searchArray.length === 0) {
      this.state.prev.forEach((marker) => {
        if (marker.fullname.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) {
          marker.setVisible(true);
          searchArray.push(marker);
        }
        else {
          marker.setVisible(false);
        }
      });
    } 
    else {
      this.state.markers.forEach((marker) => {
        if (marker.fullname.toLowerCase().indexOf(e.target.value) >= 0) {
          marker.setVisible(true);
          searchArray.push(marker);
        } else {
          marker.setVisible(false);
        }
      });
    }
    this.setState({
      markers: searchArray
    })
  }
 
  //render list
  render = () => {
    return (
      <div id = "full-content" role = "main" >      
      <List allPlaces= {this.state.markers}
      openInfoWindow = { this.openInfoWindow} 
      searchQuery = { this.searchQuery}
      
      />
      <div id = "map-box" role = "application" tabIndex = "-1" >
      <div id = "map" style = {{ height: window.innerHeight + "px" }} >
      </div>
      </div>
      </div>
    );
  }
}

export default App;

function mapLoad(src) {

  var refers = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  script.onerror = () => {
    document.getElementById('map').innerHTML = "Script Cannot be loaded"
  }
  refers.parentNode.insertBefore(script, refers);
}
