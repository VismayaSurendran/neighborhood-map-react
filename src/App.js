import React, { Component } from 'react';
import './App.css';

class App extends Component {

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
