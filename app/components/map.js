import React from 'react';
const helpers = require("./utils/helpers");


class Map extends React.Component {
   
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
}


render() {
  return (
    <div>
      <h1> Map</h1>
      <div id="map"></div>
   </div>
  );
}
initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    
    var marker = new google.maps.Marker({
      position: uluru,
      map: this.props.map
    });
  }
}



export default Map;