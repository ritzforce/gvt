import React from 'react';
import gps from './../metadata/GPS';



// Google Maps logic encapsulated here
class GoogleMaps extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  componentDidMount(){
    var uluru = {lat: 26.820176999999997, lng: 75.7865766};

    this.infowindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(this.node, {
      zoom: 7,
      center: { lat: 26.820176999999997, lng: 75.7865766 },
    });
    let bounds = new google.maps.LatLngBounds();

    let allCoordinates = [];

    for(const gpsRecord of gps){
      console.log(gpsRecord);
      var latlng = new google.maps.LatLng(gpsRecord.lat, gpsRecord.lng);

      allCoordinates.push({lat: gpsRecord.lat, lng: gpsRecord.lng});

      this.createMarker(latlng, gpsRecord.timestamp , gpsRecord.time);

      bounds.extend(latlng);
    }
    var flightPlanCoordinates = [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];

    let flightPath = new google.maps.Polyline({
      path: allCoordinates,
      geodesic: true,
      strokeColor: '#808080',
      strokeOpacity: 0.7,
      strokeWeight: 2
    });

    flightPath.setMap(this.map);

    this.map.fitBounds(bounds);
  }

  createMarker(latLng,timestamp,time ){

    let color = 'red';
    if(time < 15) {
      color = 'green';
    }
    if(time >= 15 && time < 60){
      color = 'blue';
    }


    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillOpacity: 1,
        fillColor: color,
        strokeColor: 'black',
        strokeWeight: 1
      },
    });

    var that = this;

    marker.addListener("click", function(){
      that.infowindow.close();
      that.infowindow.setContent("<b>Details</b> <br/>" + timestamp + ". " + time  + " (mins)");
      that.infowindow.open(that.map, marker);
    })



  }

  render(){
     return (
       <div className={'map'} ref={(node) => (this.node = node)} >Google Map</div>
     );
  }
}

export  default GoogleMaps;
