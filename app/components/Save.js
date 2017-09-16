import React from 'react';
import PacApiHelper from "./PacApiHelper";
const helpers = require("./utils/helpers");

class Save extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
        pacId: null
    };
    // this.savePac = this.savePac.bind(this);
    this.handleSavePac = this.handleSavePac.bind(this);
  }

  componentDidUpdate() {
    console.log(this.props.places);
  }

/*  savePac(){
    var title = this.props.title;
    console.log('title here: ' + title);
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
  }*/

  handleSavePac(){
    var pac = {
            title: this.props.title
    };
    console.log('call handleSavePac' + JSON.stringify(this.props.places));

    var addedPlaces = [];
    this.props.places.map((place, index) => {
      var pacplace={
        "name": place.name,
        "lat": place.geometry.location.lat(),
        "lng": place.geometry.location.lng(),
        "address": place.formatted_address,
        "city": "",
        "state": "",
        "zipcode": "",
        "country": "",
        "officialWebsite": "http://www.centralparknyc.org/",
        "googlePlaceId": place.place_id
      };
      addedPlaces.push(pacplace);
    });
    pac.places = addedPlaces;
    pac._id = this.state.pacId;

    console.log('call handleSavePac' + JSON.stringify(pac));
    if(this.state.pacId != null) {
      console.log('call update handleSavePac' + JSON.stringify(pac));
      PacApiHelper.updatePac(pac)
        .then(data => {
         console.log("get updated pac is: -----------------" );
                console.log(JSON.stringify(data));

          console.log("updated pac is: -----------------" );
          console.log(this.state);
      });
    }
    else {
      console.log('call save new handleSavePac' + JSON.stringify(pac));
      PacApiHelper.addPac(pac)
        .then(data => {   
         console.log("get saved new pac is: -----------------" );
                console.log(JSON.stringify(data));
          
          this.setState(prevState => ({
            pacId: data._id
          }));
          console.log("saved pac is: -----------------" );
          console.log(this.state);
      });
    }  
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleSavePac} className="save-btn" data-toggle="modal" data-target="#myModal"> Save Pack </button>
     </div>
    
    );
  }
}

export default Save;