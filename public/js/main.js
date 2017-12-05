"use strict";


const gInterface=(function(){
    return{
        bindEvents:function(){
            google.maps.event.addListener(map, 'click', function(event) {
                var pos = {lat:0,lng:0};
                pos.lat =parseFloat(event.latLng.lat());
                pos.lng =parseFloat(event.latLng.lng());
                Maps.deleteMarker();
                let content={title:'',
            description:'new marker'}
                Maps.placeMarker(pos,true,content);
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
                    let content = {title:spot.address,description:spot.description,rating:spot.rating,id:spot._id}
                    Maps.placeMarker({lat:parseFloat(spot.lat),lng:parseFloat(spot.lng)},false,content)
                })

                
            });
        }
    }
})();


var initMap = function(){
    gInterface.MapsEvents();
    gInterface.bindEvents();
    
}