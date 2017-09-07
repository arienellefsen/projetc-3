import React from 'react';
var helpers = require("./utils/helpers");
import Map from './Map';


class Create extends React.Component {
		constructor(props) {
				super(props);
				this.myClass = 'hidden';
				this.handleClick = this.handleClick.bind(this);
				this.getPlaces = this.getPlaces.bind(this);
		}

		map = null;
		service = null;

		//Create a pac function to display the name and the search field
		handleClick = (e) => {
			 if (this.myClass === 'hidden'){
					 this.searchForm.classList.remove('hidden');
					 this.searchForm.classList.add('pac-form');						
			 }
		}

		getPlaces(event) {
				const {
						id,
						onDataReceived
				} = this.props;

				// The above code means the same as this:
				event.preventDefault();

				//Create variables to pass as arguments
				const place = this.place.value;

				this.map = new google.maps.Map(document.getElementById('map'), {
					zoom: 15
				});

				var request = {
					query: place
				};

				this.service = new google.maps.places.PlacesService(this.map);
				this.service.textSearch(request, (places) => {
						console.log(places);
						console.log(places[0].name);
						console.log(places[0].formatted_address);
						console.log(places[0].place_id);
						console.log(places[0].reference);

						var lat = places[0].geometry.location.lat();
						var long = places[0].geometry.location.lng();

						console.log('lat: ' + lat);
						console.log('long: ' + long);


						var place = document.getElementById('place');
						place.innerHTML += "<h2>"+places[0].name+"</h2>" +"<p>" +places[0].formatted_address+"</p><hr>" ;



						if (typeof onDataReceived === 'function') {
								onDataReceived(places);
						}
				});
		}

		render() {
				return (
						<div>
								
										<form ref={(input) => this.searchForm = input}  onSubmit={(e) => this.getPlaces(e)}>
												<span><input ref={(input) => this.place = input} type="text" placeholder="Place" className="searchField" /><button type="submit" >
															Search
														</button>
												</span>
										</form>
												<div id="place" className="placeResult"></div>



								{/* We will render our map into this empty div! */}
						</div>
						
				)
			}
	}
	export default Create;