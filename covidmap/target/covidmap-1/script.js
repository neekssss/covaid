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
    center: { lat: 37.773972, lng: -122.431297 },
    zoom: 10
  });
}
