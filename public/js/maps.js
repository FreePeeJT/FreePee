let map;
let previousMarker;

const Maps = (function(){

    return{
    initMap:function(){
        let uluru = {lat: 54.5, lng: 4};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
       
    },
    placeMarker:function(pos,newmarker,content){
        let marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon:'../images/wc.png'
          });
          if(newmarker){
              previousMarker=marker;
          }
          let infowindow = new google.maps.InfoWindow({
            content: '<div class="card text-center"><div class="card-body"><h1 class="card-title page-leader">'+content.title+'</h1><div class="card-text text-left">'+content.description+'</div><div class="starsContainer">'+Maps.generateHtmlRating(content.rating,content.id)+'</div></div></div>'
          });
          marker.addListener('click',function(){
            infowindow.open(map, marker);            
          });
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
},
sendRating:function(e,t){
console.log(e);
$(t).closest('.starsContainer').html(Maps.generateHtmlRating($(t)[0].dataset.number,$(t)[0].dataset.id))
$.post('/changeRating',function(){
  
})
},
generateHtmlRating:function(rating,id){
  let html = '';
  for(let i=1;i<=rating;i++){
    html += '<button data-onoff="true" data-id="'+id+'" data-number='+i+' class="m-1 rating" onclick="Maps.sendRating(event,this)"><i class="fa fa-heart fa-2x" aria-hidden="true"></i></button>'
  }
  for(let i=1;i<=5-rating;i++){
    let number = i + parseInt(rating);
    html += '<button class="m-1 rating" data-onoff="false" data-id="'+id+'" data-number="'+number+'" onclick="Maps.sendRating(event,this)"><i class="fa fa-heart-o fa-2x" aria-hidden="true"></i></button>'
  }
  

  return html;
}
}
})();
    