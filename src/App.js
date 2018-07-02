import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state={
		allPlaces:require("./locations.json"),
		map:"",
		prev:[],
		markers:[]
	}

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
    window.google.maps.event.addListener(marker,'click',()=> {
        this.openInfo(marker);
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

   var infowindow=new window.google.maps.InfoWindow({maxWidth:250});
	this.setState({
		infowindow:infowindow
	})
}
openInfo=(marker)=> {
	marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 1000);
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
