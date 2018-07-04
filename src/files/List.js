// To make best use of React
import React, {Component} from 'react';

class List extends Component {
  state = {
    query: ''
  }
  render = () => {
    return (
      <div className = "list-box" >
      <h3 className="list-head">RESTAURANTS & CAFE</h3>
      <input 
      type = "text" 
      placeholder = "Search here"
      className = "input-box"
      aria-label = "Search Box"
      role = "Search" 
      onChange = {this.props.searchQuery}/>
      <ul className = "sidelist" 
      aria-label="list of locations" 
      role = "navigation" >
      {
        this.props.allPlaces.map((venue,pos) => {
            return ( < li key = {pos}
              className = "places"
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
