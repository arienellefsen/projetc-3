import React from 'react';
const helpers = require("./utils/helpers");


class Map extends React.Component {
   
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <h1> Map</h1>
        <div id="map"></div>
     </div>
    );
  }
}

export default Map;