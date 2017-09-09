import React from 'react';
import Create from './Create';
import Save from './Save';

// import Map from './Map';

const helpers = require("./utils/helpers");
const US_CENTER_POSITION = {
  lat: 41.850033,
  lng: -87.6500523
};
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.getMap = this.getMap.bind(this);
    this.getService = this.getService.bind(this);
    this.removePlace = this.removePlace.bind(this);


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
  this.addMapMarker = this.addMapMarker.bind(this);
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
          zoom: 3,
          center: US_CENTER_POSITION
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

         position: place.geometry.location,
          map: this.map
         });
    // add a marker to this.map
    //reposition the map to show the marked place
        this.map.panTo(place.geometry.location);
        this.map.setZoom(8);

        var contentString = '<div id="content">'+
      '<h3>'+place.name+'</h3>'+
      '<p>' + place.formatted_address+'</p>'
      '</div>';

       //Add click info window 
       google.maps.event.addListener(marker, 'click', function() {
          this.infowindow = new google.maps.InfoWindow();
          this.infowindow.setContent(contentString);
          this.infowindow.open(this.map, this);
        });

  }

  removePlace(e, index){
    console.log('remove place');
    var newplaces = this.state.places;

    newplaces.splice(index, 1);

    this.setState({
      places: newplaces
       });

  }

  deleteMarkers() {
        clearMarkers();
        markers = [];
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
                <div id="place" className="placeResult">
                <h1> Places Added to Map </h1>
					      {this.state.places.map((place, index) => {
						//
						//
						//
						console.log("place: " ,place);
						return (
							<div key={place.id}>
                  <h2>{place.name}</h2>
                  <p>{place.formatted_address}</p>
                  <button
                    onClick={() => {this.removePlace(place, index)}}
                  >
                    Remove from map
                  </button>
                </div>
                  );
                })}
				    </div>
            <Save places={this.state.places} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Main;