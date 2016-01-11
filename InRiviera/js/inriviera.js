//------------------------------------------------------------------------------
// Position management
//------------------------------------------------------------------------------

function showPosition() {
    geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
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

    geocoder.geocode({'location': pos}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                // extracting city
                var city="Unknown";
                for (var y = 0; y < results[0].address_components.length; y++){
                  var type = results[0].address_components[y].types[0];
                    if (type === "locality"){
                      city = results[0].address_components[y].long_name;
                    }
                }
                document.getElementById("position-nav-location").innerHTML = city;
                document.getElementById("position-nav").style.display = "inline-block";
                document.getElementById("position-nav-lost").style.display = "none";
                
                document.getElementById("position-side-location").innerHTML = results[0].formatted_address;
                document.getElementById("position-side").style.display = "inline-block";
                document.getElementById("position-side-lost").style.display = "none";
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
    
}

//------------------------------------------------------------------------------
// JSON
//------------------------------------------------------------------------------

function update(source) {
    document.getElementById("page-title").innerHTML = source;
    ajaxJSON("./json/"+source+".json" , function updateCards(json){
        
        var media = (json.data[0].ogg)? 
                    '<video id="video"  controls  style="width:100%;" >'+
                            '<source type="video/ogg" src="'+json.data[0].ogg+'" />' +
                            '<source type="video/mp4" src="'+json.data[0].mp4+'" />' +
                    '</video>' 
                    : '<img src="'+json.data[0].media+'">';
        
        document.getElementById("ir-card-media-0").innerHTML =  media;
        document.getElementById("ir-card-title-0").innerHTML= json.data[0].title;
        document.getElementById("ir-card-text-0").innerHTML = json.data[0].description;
        document.getElementById("ir-card-link-0").href= json.data[0].target;
        document.getElementById("ir-card-link-text-0").innerHTML = json.data[0].action;
        
        document.getElementById("ir-card-media-1").innerHTML =  '<img src="'+json.data[1].media+'">';
        document.getElementById("ir-card-title-1").innerHTML= json.data[1].title;
        document.getElementById("ir-card-text-1").innerHTML = json.data[1].description;
        document.getElementById("ir-card-link-1").href= json.data[1].target;
        document.getElementById("ir-card-link-text-1").innerHTML = json.data[1].action;
        
        document.getElementById("ir-card-media-2").innerHTML =  '<img src="'+json.data[2].media+'">';
        document.getElementById("ir-card-title-2").innerHTML= json.data[2].title;
        document.getElementById("ir-card-text-2").innerHTML = json.data[2].description;
        document.getElementById("ir-card-link-2").href= json.data[2].target;
        document.getElementById("ir-card-link-text-2").innerHTML = json.data[2].action;
     
        
    } );
    
    
}


function ajaxJSON(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

