import React, { Component } from 'react';
import './App.css';
import * as foursquare from './foursquare'

class App extends Component {
	state={
		allPlaces:require("./locations.json"), //getting all the places from json file
		map:"",
		prev:[],
		markers:[]

	}
	//for loading the map
	componentDidMount=()=> {
	window.initMap=this.initMap;

	mapLoad('https://maps.googleapis.com/maps/api/js?key=AIzaSyBH3wHqNnJZiuMCD1NhAGbgFF8xmVD1ah8&callback=initMap'); 
	}

	initMap=()=>{
	
	var showmap=document.getElementById('map');
	var map=new window.google.maps.Map(showmap,{
		center:{lat:11.259550, lng:75.776057},
		zoom:15,
	});
	this.setState({
      map: map,
    });

   var locationsList=[];
   var bounds= new window.google.maps.LatLngBounds();
   var infowindow=new window.google.maps.InfoWindow({maxWidth:250});
	this.setState({
		infowindow:infowindow
	})
   //adding markers
    this.state.allPlaces.forEach(place=>{
    var marker = new window.google.maps.Marker({
    	position: {
                	lat: place.latitude, 
                	lng: place.longitude},
                	map: map,
                	animation: window.google.maps.Animation.DROP,
                	fullname : place.name + ' -- ' + place.type
   })
    locationsList.push(marker);
    var locations= new window.google.maps.LatLng(marker.position.lat(), marker.position.lng());
    bounds.extend(locations);
    //open infowindow when marker is clicked
    window.google.maps.event.addListener(marker,'click',()=> {
        this.openInfoWindow(marker,infowindow);
      })
    })
   this.setState({
  		prev:locationsList,
  		markers:locationsList
  	})
   var center=map.getCenter();

   window.google.maps.event.addDomListener(window, "resize", ()=> {
   	this.state.map.setCenter(center);
   	this.state.map.fitBounds(bounds);
    this.state.map.panToBounds(bounds);
});

}

//shows info window
 openInfoWindow=(marker,infowindow)=> {
 		if (infowindow.marker != marker) {
           // this.map.panTo(new window.google.maps.LatLng(marker.position.lat(), marker.position.lng()));
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            infowindow.marker = marker;
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1500);
            infowindow.setContent('<div>Loading details..</div>');
            infowindow.open(this.map, marker);
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
            });
        }
        //contents of infowindow
          foursquare.foursquareApi(marker.position.lat(), marker.position.lng()).then((res) => {
            console.log(res);
            if (res.response.venues.length > 0) {
                var venue = res.response.venues[0];
                var placeName = "";
                var contact = "";
                var placeAddress = "";
                var moreAbout = '<a href="https://foursquare.com/v/'+ venue.id +'" target="_blank"><b>More about the place..</b></a>'
                if (venue.name) {
                    placeName = venue.name;
                }
                if (venue.location && venue.location.formattedAddress && venue.location.formattedAddress.length > 0) {
                    placeAddress = venue.location.formattedAddress[0];
                }
                if (venue.contact && venue.contact.phone) {
                    contact = venue.contact.phone;
                }
                infowindow.setContent('<div><div><strong>Name: ' + placeName + '</strong></div><div>Address: ' + placeAddress + '</div><div>Phone: ' + contact + ' </div><div>' + moreAbout+ '</div></div>');
            }

        }).catch(function (err) {
            infowindow.setContent('<div><strong>Sorry..cannot load details/strong></div>');
        });;
    
    }



	



  render() {
    return (
      <div>
       <div id="map" style={{height:window.innerHeight+"px"}}></div>
        
      </div>
    );
  }
}

export default App;

function mapLoad(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
