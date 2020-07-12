function getNews() {
    const searchFrom = document.querySelector('.search');
    const input = document.querySelector('.input');
    const newsList = document.querySelector('.news-list');

    searchFrom.addEventListener('submit', newsFetch)

    function newsFetch(e) {
        // checks if search field is empty
        if (input.value == '') {
            alert('Please enter search!')
            return
        }
                
        e.preventDefault()

        const apiKey = 'nalhGwkCIzLTssWOSn8LbXWKZ4AhIHCW' // API KEY for NYTimes api
        let topic = input.value;

        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&fq=covid&sort=newest&api-key=${apiKey}` // api query

        // iterates through JSON returned by api and creates list elements for page
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            newsList.innerHTML = ''
            for (var i = 0; i < 10; i++) {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.setAttribute('href', data.response.docs[i].web_url); // attaches url/link to list element
                a.setAttribute('target', '_blank');
                a.textContent = data.response.docs[i].headline.main; // sets list element name/title
                li.appendChild(a);
                newsList.appendChild(li); // final element created
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.0522, lng: -118.2437 },
    zoom: 10
  });
  setMarkers(map);
  
}

// add some hard-coded test markers to map
var testingSites = [
    ['CVS', 34.187508, -118.369777],
    ['Mend Urgent Care', 34.15911, -118.449056],
    ['Exer Urgent Care', 34.045652, -118.43208],
    ['Harbor-UCLA', 33.828807, -118.298656],
    ['LAC+USC Medical Center', 34.057533, -118.207559]
];

function setMarkers(map) {
    var infoWindow = new google.maps.InfoWindow();
    var MarkerClickHandler = function() {
        infoWindow.close();
        map.setZoom(12);
        infoWindow = new google.maps.InfoWindow({position: this.getPosition()});
        infoWindow.setContent(this.title);
        infoWindow.open(map);
        map.setCenter(this.getPosition());
    };
    for (var i = 0; i < testingSites.length; i++) {
        // set marker for each testing site
        var testingSite = testingSites[i];
        const marker = new google.maps.Marker({
            position: {lat: testingSite[1], lng: testingSite[2]},
            map: map,
            title: testingSite[0]
        });
        google.maps.event.addListener(marker, 'click', MarkerClickHandler);
    };
}


