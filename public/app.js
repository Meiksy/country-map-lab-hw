window.onload = function () {

    
    //setup views
    var countrySelectView = new CountrySelectView(document.querySelector('#countries'));
    var countryDetailView = new CountryDetailView(document.querySelector('#info'));

    //link change on select to update detail view and persist last country
    countrySelectView.onChange = function(country){
      countryDetailView.display(country);
      lastCountry.save(country);
    }

    //setup country list model
    var world = new CountryList();

    //update views on data update
    world.onUpdate = function(countries){
      countrySelectView.populate(countries);
      var savedCountry = lastCountry.get();
      console.log('saved Country', savedCountry);
      if(savedCountry){
        countrySelectView.setSelectedIndex(savedCountry.index);
        countryDetailView.display(savedCountry);
      }
    };

    //get data from server
    world.populate();
    
    }


    // var initialize = function() {
    //   var center = { lat: 55.951699, lng: -3.189468 }
    //   var zoom = 14;
    //   var map = new Map( center, zoom );
    //   // map.addMarker( center );

    //   map.addMarker( {lat: 55.946998, lng: -3.202214} );

    //   map.bindClick()

    //   map.addInfoWindow( center, "My info window")


    //   function initMap() {
    //     // Create a map object and specify the DOM element for display.
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //       center: {lat: -34.397, lng: 150.644},
    //       scrollwheel: false,
    //       zoom: 8
    //     });
    //   }



//------------------------------

// This is the minimum zoom level that we'll allow
var minZoomLevel = 5;

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: minZoomLevel,
    center: new google.maps.LatLng(38.50, -90.50),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

// Bounds for North America
var strictBounds = new google.maps.LatLngBounds(
new google.maps.LatLng(28.70, -127.50),
new google.maps.LatLng(48.85, -55.90));

// Listen for the dragend event
google.maps.event.addListener(map, 'dragend', function () {
    if (strictBounds.contains(map.getCenter())) return;

    // We're out of bounds - Move the map back within the bounds

    var c = map.getCenter(),
        x = c.lng(),
        y = c.lat(),
        maxX = strictBounds.getNorthEast().lng(),
        maxY = strictBounds.getNorthEast().lat(),
        minX = strictBounds.getSouthWest().lng(),
        minY = strictBounds.getSouthWest().lat();

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    map.setCenter(new google.maps.LatLng(y, x));
});

// Limit the zoom level
google.maps.event.addListener(map, 'zoom_changed', function () {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
});
