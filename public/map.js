var Map = function( latLng, zoom ) {

  this.googleMap = new google.maps.Map( document.getElementById('map'), {
    center: latLng,
    zoom: zoom
  } );

  this.addMarker = function( latLng, label, title ) {
    var marker = new google.maps.Marker( {
      position: latLng, 
      map: this.googleMap,
      label: label,
      title: title
    } )
    return marker;
  }

  this.bindClick = function() {
    var counter = 1
    google.maps.event.addListener( this.googleMap, 'click', function(userClick) {

      this.addMarker( { lat: userClick.latLng.lat(), lng: userClick.latLng.lng() },
        counter.toString() )
      counter +=1;

      console.log( userClick.latLng.lat() )
      console.log( userClick.latLng.lng() )
    }.bind( this ) )
  }

this.addInfoWindow = function(latLng, title) {
  var marker = this.addMarker(latLng, "1", title);
  marker.addListener( 'click', function() {
    var InfoWindow = new google.maps.InfoWindow({
      content: this.title
    });
    InfoWindow.open( this.map, marker )
  } );
}

};