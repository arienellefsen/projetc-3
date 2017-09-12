import React from 'react';
const helpers = require("./utils/helpers");


class Save extends React.Component {
   
  constructor(props) {
    super(props);
    this.savePac = this.savePac.bind(this);
  }

  componentDidUpdate() {
    console.log(this.props.places);
    console.log(this.props.title);

  }

  savePac(){
    var addedPlaces = this.props.places;
    this.props.places.map((place, index) => {
      let address = place.formatted_address;
      let placeName = place.name;
      let placeId = place.place_id;
      let lat = place.geometry.location.lat();
      let long =  place.geometry.location.lng();

      console.log('name:' + place.name);
      console.log ('address:' + place.formatted_address);
      console.log('googleid:' + place.place_id);
      console.log('lat:' + place.geometry.location.lat());
      console.log('long:' + place.geometry.location.lng());

      helpers.savePac(placeName, address, placeId, lat, long);
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.savePac} className="save-btn" data-toggle="modal" data-target="#myModal"> Save Pack </button>
     </div>
    
    );
  }
}

export default Save;