import React from 'react';
import Create from './Create';
// import Map from './Map';

const helpers = require("./utils/helpers");

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.getMap = this.getMap.bind(this);
    this.getService = this.getService.bind(this);

    /*
    A place looks like:

    {
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      officialWebsite: '',
      googlePlaceId: ''
    }

    */

    this.state = {
      title: '',
      pictureURL: '', // maybe
      places: [],
    };
  }

  map = null;
  service = null;
  
  getService () { return this.service; }
  getMap () { return this.map }

  componentDidMount() {
    console.log('mount!');
    
    this.map = new google.maps.Map(document.getElementById('map'), {
     
      zoom: 2,
      center: { lat: -25.363, lng: 131.044 }
    });

    this.service = new google.maps.places.PlacesService(this.map);
  }

  componentDidUpdate(prevProps) {
    console.log('update!');
  }

  componentWillUnmount() {
    console.log('unmount!');
  }

  addMapMarker(place) {

    //const marker = new google.maps.Marker();
    var marker = new google.maps.Marker({

         position: {lat: place.geometry.location.lat(),lng: place.geometry.location.lng() },
          map: this.map
         });
    // add a marker to this.map
  }

  render() {
    // TODO: add input here bound to this.state.title
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Create 
              getService={this.getService}
              getMap={this.getMap}
              addPlaceToPac={(place) => {
                console.log('Adding place to parent Pac state: ', place)
                this.addMapMarker(place);
                this.setState({
                  places: this.state.places.concat(place)
                });
              }}
            />
          </div>
          <div className="col-md-6">
            <div>
                <h1> Map</h1>
                <div id="map"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Main;