let map;
let previousMarker;

const Maps = (function(){

    return{
    initMap:function(){
        let uluru = {lat: 0, lng: 0};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
       
    },
    placeMarker:function(pos,newmarker){
        let marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon:'../images/wc.png'
          });
          if(newmarker){
              previousMarker=marker;
          }
    },
    geolocation:function(){
     // Try HTML5 geolocation.
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          Maps.placeMarker(pos);
        }
        );
      } else {
        // Browser doesn't support Geolocation
      }
}
,
deleteMarker:function(){
    if(previousMarker){    previousMarker.setMap(null);
    }
}
}
})();
    