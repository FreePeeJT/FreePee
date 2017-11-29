"use strict";


const gInterface=(function(){
    return{
        bindEvents:function(){
            google.maps.event.addListener(map, 'click', function(event) {
                var pos = {lat:0,lng:0};
                pos.lat =event.latLng.lat();
                pos.lng =event.latLng.lng();
                Maps.deleteMarker();
                Maps.placeMarker(pos,true);
                $('#newSpotForm input[name=lat]').val(pos.lat);
                $('#newSpotForm input[name=lng]').val(pos.lng);
             });
        },
        MapsEvents:function(){
            Maps.initMap();
            Maps.geolocation();
            gInterface.getMarkers();
        },
        getMarkers:function(){
            $.get("/api/getspots")
            .done(function(data){
                data.forEach(spot=>{
                    Maps.placeMarker({lat:spot.lat,lng:spot.lng},false)
                })

                
            });
        }
    }
})();


var initMap = function(){
    gInterface.MapsEvents();
    gInterface.bindEvents();
    
}