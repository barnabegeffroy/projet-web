var searchInput = 'search_input';

$(document).ready(function () {
  var autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode'],
  });
  document.forms["addAnnounce"]["lat"].value.value = autocomplete.getPlace().geometry.location.lat();
  document.forms["addAnnounce"]["lat"].value = autocomplete.getPlace().geometry.location.lng();
  
  
});
// Initialize and add the map
function initMap() {

  const ensiie = { lat: 48.62682123216434, lng: 2.432315013435739 };

  // The map, centered at the announce
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: ensiie
  });

};