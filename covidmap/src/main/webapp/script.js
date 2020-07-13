function getNews() {
    const searchFrom = document.querySelector('.search');
    const input = document.querySelector('.input');
    const newsList = document.querySelector('.news-list');
    var flag = 0;

    searchFrom.addEventListener('submit', newsFetch)

    async function newsFetch(e) {
        // checks if search field is empty
        if (input.value == '' && flag == 0) {
            alert('Please enter search!')
            return
        }

        if (flag == 0) {            
            newsList.innerHTML = ''

            e.preventDefault()

            const response = await fetch('/news');
            const apiKey = await response.json();

            let topic = input.value;

            let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&fq=covid&sort=newest&api-key=${apiKey}` // api query

            // iterates through JSON returned by api and creates list elements for page
            fetch(url).then((res)=>{
                return res.json()
            }).then((data)=>{
                data.response.docs.forEach(article =>{
                    let li = document.createElement('li');
                    let a = document.createElement('a');
                    a.setAttribute('href', article.web_url); // attaches url/link to list element
                    a.setAttribute('target', '_blank');
                    a.textContent = article.headline.main; // sets list element name/title
                    li.appendChild(a);
                    newsList.appendChild(li); // final element created
                })
            }).catch((error)=>{
                console.log(error)
            })
            flag = 1;
        }
    }
}

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.0522, lng: -118.2437 },
    zoom: 10
  });
  setMarkers(map)
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
    for (var i = 0; i < testingSites.length; i++) {
        // set marker for each testing site
        var testingSite = testingSites[i];
        const marker = new google.maps.Marker({
            position: {lat: testingSite[1], lng: testingSite[2]},
            map: map,
            title: testingSite[0]
        });
    }
}
