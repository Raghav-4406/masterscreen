// import React from 'react'
// import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
// import Autocomplete from 'react-google-autocomplete';
// import Geocode from "react-geocode";

// Geocode.setApiKey("AIzaSyCjsribgsyojBFAhPMvopDaJ1BqT01UqNQ");
// Geocode.enableDebug();


// class Code extends React.Component {


//     constructor(props) {
//         super(props);
//         this.state = {
//             address: '',
//             city: '',
//             area: '',
//             state: '',
//             mapPosition: {
//                 lat: this.props.center.lat,
//                 lng: this.props.center.lng
//             },
//             markerPosition: {
//                 lat: this.props.center.lat,
//                 lng: this.props.center.lng
//             }
//         }
//     }

//     componentDidMount() {
//         Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
//             response => {
//                 const address = response.results[0].formatted_address,
//                     addressArray = response.results[0].address_components,
//                     city = this.getCity(addressArray),
//                     area = this.getArea(addressArray),
//                     state = this.getState(addressArray);

//                 console.log('city', city, area, state);
//                 this.setState({
//                     address: (address) ? address : '',
//                     area: (area) ? area : '',
//                     city: (city) ? city : '',
//                     state: (state) ? state : '',
//                 })
//             },
//             error => {
//                 console.error(error);
//             }
//         );
//     };

//     // shouldComponentUpdate(nextProps, nextState) {
//     //     if (
//     //         this.state.markerPosition.lat !== this.props.center.lat ||
//     //         this.state.address !== nextState.address ||
//     //         this.state.city !== nextState.city ||
//     //         this.state.area !== nextState.area ||
//     //         this.state.state !== nextState.state
//     //     ) {
//     //         return true
//     //     } else if (this.props.center.lat === nextProps.center.lat) {
//     //         return false
//     //     }
//     // }

//     getCity = (addressArray) => {
//         let city = '';
//         for (let index = 0; index < addressArray.length; index++) {
//             if (addressArray[index].types[0] && 'administrative_area_level_0' === addressArray[index].types[0]) {
//                 city = addressArray[index].long_name;
//                 return city;
//             }
//         }
//     };

//     getArea = (addressArray) => {
//         let area = '';
//         for (let index = 0; index < addressArray.length; index++) {
//             if (addressArray[index].types[0]) {
//                 for (let j = 0; j < addressArray[index].types.length; j++) {
//                     if ('sublocality_level_1' === addressArray[index].types[j] || 'locality' === addressArray[index].types[j]) {
//                         area = addressArray[index].long_name;
//                         return area;
//                     }
//                 }
//             }
//         }
//     };

//     getState = (addressArray) => {
//         let state = '';
//         for (let index = 0; index < addressArray.length; index++) {
//             for (let index = 0; index < addressArray.length; index++) {
//                 if (addressArray[index].types[0] && 'administrative_area_level_1' === addressArray[index].types[0]) {
//                     state = addressArray[index].long_name;
//                     return state;
//                 }
//             }
//         }
//     };

//     onChange = (event) => {
//         this.setState({ [event.target.name]: event.target.value });
//     };

//     onInfoWindowClose = (event) => { };


//     onMarkerDragEnd = (event) => {
//         let newLat = event.latLng.lat(),
//             newLng = event.latLng.lng();

//         Geocode.fromLatLng(newLat, newLng).then(
//             response => {
//                 const address = response.results[0].formatted_address,
//                     addressArray = response.results[0].address_components,
//                     city = this.getCity(addressArray),
//                     area = this.getArea(addressArray),
//                     state = this.getState(addressArray);
//                 this.setState({
//                     address: (address) ? address : '',
//                     area: (area) ? area : '',
//                     city: (city) ? city : '',
//                     state: (state) ? state : '',
//                 })
//             },
//             error => {
//                 console.error(error);
//             }
//         );
//     };


//     onPlaceSelected = (place) => {
//         console.log('plc', place);
//         const address = place.formatted_address,
//             addressArray = place.address_components,
//             city = this.getCity(addressArray),
//             area = this.getArea(addressArray),
//             state = this.getState(addressArray),
//             latValue = place.geometry.location.lat(),
//             lngValue = place.geometry.location.lng();
//         console.log('latValue', latValue)
//         console.log('lngValue', lngValue)
//         // Set these values in the state.        
//         this.setState({
//             address: (address) ? address : '',
//             area: (area) ? area : '',
//             city: (city) ? city : '',
//             state: (state) ? state : '',
//             markerPosition: {
//                 lat: latValue,
//                 lng: lngValue
//             },
//             mapPosition: {
//                 lat: latValue,
//                 lng: lngValue
//             },
//         })
//     };


//     render() {
//         const AsyncMap = withScriptjs(
//             withGoogleMap(
//                 props => (
//                     <GoogleMap
//                         google={this.props.google}
//                         defaultZoom={this.props.zoom}
//                         defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
//                     >

//                         {/*Marker*/}
//                         <Marker
//                             google={this.props.google}
//                             name={'Dolores park'}
//                             draggable={true}
//                             onDragEnd={this.onMarkerDragEnd}
//                             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
//                         />
//                         <InfoWindow
//                             onClose={this.onInfoWindowClose}
//                             position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
//                         >
//                             <div>
//                                 <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
//                             </div>
//                         </InfoWindow>
//                         <Marker />

//                         {/* For Auto complete Search Box */}
//                         <Autocomplete
//                             style={{
//                                 width: '100%',
//                                 height: '40px',
//                                 paddingLeft: '16px',
//                                 marginTop: '2px',
//                                 marginBottom: '100px'
//                             }}
//                             onPlaceSelected={this.onPlaceSelected}
//                             types={['(regions)']}
//                         />
//                     </GoogleMap>
//                 )
//             )
//         );

//         let map;
//         if (this.props.center.lat !== undefined) {
//             map = <div>
//                 <div>
//                     <div className="form-group">
//                         <label htmlFor="">City</label>
//                         <input type="text" name="city" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.city} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="">Area</label>
//                         <input type="text" name="area" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.area} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="">State</label>
//                         <input type="text" name="state" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.state} />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="">Address</label>
//                         <input type="text" name="address" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.address} />
//                     </div>
//                 </div>

//                 <AsyncMap
//                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjsribgsyojBFAhPMvopDaJ1BqT01UqNQ&libraries=places"
//                     loadingElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                     containerElement={
//                         <div style={{ height: this.props.height }} />
//                     }
//                     mapElement={
//                         <div style={{ height: `100%` }} />
//                     }
//                 />
//             </div>
//         } else {
//             map = <div style={{ height: this.props.height }} />
//         }
//         return (map)
//     }
// }
// export default Code