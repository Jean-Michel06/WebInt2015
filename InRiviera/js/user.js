
/**
 * preparing the map canvas
 * @returns {undefined}
 */
function initMap() {
    var mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    infoWindow = new google.maps.InfoWindow({map: map});
    geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Your browser does not support geo-location");
        geoError(null);
    }
}

/**
 * display discoverd location
 * @param {type} position
 * @returns {undefined}
 */
function geoSuccess(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    infoWindow.setPosition(pos);
    infoWindow.setContent("You are here!");
    map.setCenter(pos);

    geocoder.geocode({'location': pos}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                document.getElementById("address").value = results[0].formatted_address;
            }
        }
    });
}

/**
 * handling error by going to default location
 * @param {type} position
 * @returns {undefined}
 */
function geoError(position) {
    // default location to Paris
    var pos = {
        lat: 48.8534275,
        lng: 2.3582788
    };
    infoWindow.setPosition(pos);
    infoWindow.setContent("Can't locate you!");
    map.setCenter(pos);
}

/**
 * marking new location on the map from address
 * @returns {undefined}
 */
function geoShow() {
    var address = document.getElementById("address").value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({map: map, position: results[0].geometry.location});
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}
