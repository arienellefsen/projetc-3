import React from 'react';
var helpers = require("./utils/helpers");

/*
var Create = {
	map: null,
	service: null
};
*/

class Create extends React.Component {
		constructor(props) {
				super(props);
				this.myClass = 'hidden';
				this.handleClick = this.handleClick.bind(this);
				this.getPlaces = this.getPlaces.bind(this);
		}

		map: null;
		service: null;

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

						if (typeof onDataReceived === 'function') {
								onDataReceived(places);
						}
				});
		}

		render() {
				return (
						<div className="row">
								<div className="col-xs-10 col-sm-10 col-md-12"> 
										<button onClick={this.handleClick} className="create-button" >
												<i className="pe-7s-plus icon-create"></i>
												Create a PAC
										</button>
								</div>
						<div className="col-xs-10 col-sm-10 col-md-12"> 
										<form ref={(input) => this.searchForm = input} className={this.myClass} onSubmit={(e) => this.getPlaces(e)}>
												<input ref={(input) => this.name = input} type="text" placeholder="Add a name to you PAC" />
												<span><input ref={(input) => this.place = input} type="text" placeholder="Place" /><button className="add-button"> + Add</button></span>

												<button type="submit" >
														Search
												</button>
										</form>
								</div>

								{/* We will render our map into this empty div! */}
								<div id="map"></div>
						</div>
				)
			}
	}
	export default Create;