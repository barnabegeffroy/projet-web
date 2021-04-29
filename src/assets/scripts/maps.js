var searchInput = 'search_input';

$(document).ready(function () {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'],
    });
});

// Initialize and add the map
function initMap() {
    // The location of the announce
    const myPosition = { lat: -25.344, lng: 131.036 };
    // The map, centered at the announce
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myPosition,
    });
    // The marker, positioned at myPosition
    const marker = new google.maps.Marker({
        position: myPosition,
        map: map,
    });
}