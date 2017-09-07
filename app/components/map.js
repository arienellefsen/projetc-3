import React from 'react';

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
      )
    }
    initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
  }

export default Map;