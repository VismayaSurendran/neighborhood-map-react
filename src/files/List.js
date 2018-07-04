// To make best use of React
import React, {Component} from 'react';

class List extends Component {
  state = {
    query: ''
  }
  render = () => {
    return (
      <div id = "filter-navigator" >
      <h3 id="names">Restaurants and Cafe</h3>
      <input 
      type = "text" 
      placeholder = "Search here"
      id = "filter"
      aria-label = "Search Filter"
      role = "Search" 
      onChange = {this.props.searchQuery}/>
      <ul id = "items-list" 
      aria-label="list of locations" 
      role = "navigation" >
      {
        this.props.allPlaces.map((venue,pos) => {
            return ( < li key = {pos}
              className = "elementss"
              onClick = {
                this.props.openInfoWindow.bind(this,venue)
              }
              value = {
                this.state.query
              }
              tabIndex = "0" >
              {
                venue.fullname
              } < /li>)
            })
        }
        </ul>
        </div>
      );

    }
  }
  export default List
