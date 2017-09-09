import React from 'react';
const helpers = require("./utils/helpers");

class Save extends React.Component {
   
  constructor(props) {
    super(props);
    this.savePac = this.savePac.bind(this);
     }

  componentDidUpdate() {
    console.log(this.props.places);
  }

  savePac(){
    var addedPlaces = this.props.places;
    this.props.places.map((place, index) => {
      let address = place.formatted_address;
      let placeName = place.name;
      let placeId = place.place_id;
      console.log('name:' + place.name);
      console.log ('address:' + place.formatted_address);
      console.log('googleid:' + place.place_id);
      helpers.savePac(placeName, address, placeId);

    })

    //console.log('Save places here:' + JSON.stringify(myJSON)); 
  }  

  render() {
    return (
      <div>
        <button onClick={this.savePac}> Save Pack </button>
     </div>
    );
  }
}

export default Save;