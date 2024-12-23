const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');




function listTeam() {
    const teamMembers = document.getElementById('ourTeam');
    teamMembers.innerHTML = "";
    fetch('travel_team.json')
        .then(response => response.json())
        .then(data => {
            data.team.forEach(member => {
                teamMembers.innerHTML += `<li class="teamMember"><p>${member.name}</p><p>${member.role}</p></li>`;            
            });
        })
        .catch(error => {
            console.error('Error:', error);
            teamMembers.innerHTML = 'An error occurred while fethcin data';
        });
}

function searchLocations() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rightDiv = document.getElementById('rightSide');
    rightDiv.innerHTML = "";
    const results = [];

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            rightDiv.innerHTML += '<div id="searchResults" class="searchContent"></div>'
            // Search countries for keyword
            if (input.toLowerCase().includes("countr")) {
                const results = document.getElementById('searchResults');
                results.innerHTML = "";
                data.countries.forEach(country => {
                    results.innerHTML += `<div id="searchCountry"><img src=${country.imageUrl}><h3>${country.name}</h3><p>${country.description}</p></div>`;
                });
            } else if (input.toLowerCase().includes("temp")) {
                const results = document.getElementById('searchResults');
                results.innerHTML = "";
                data.temples.forEach(temple => {
                    displayTime(temple);
                    results.innerHTML += `<div id="searchTemple"><img src=${temple.imageUrl}><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
                });
            } else if (input.toLowerCase().includes("beach")) {
                const results = document.getElementById('searchResults');
                results.innerHTML = "";
                data.beaches.forEach(beach => {
                    displayTime(beach);
                    results.innerHTML += `<div id="searchBeach"><img src=${beach.imageUrl}><h3>${beach.name}</h3><p>${beach.description}</p></div>`;
                })
            } else {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        if (city.description.toLowerCase().includes(input)) {
                            displayTime(city);
                            rightDiv.innerHTML += `<div class="searchContent"><img src=${city.imageUrl}><h3>${city.name}</h3><p>${city.description}</p></div>`;
                        } else if(city.name.toLowerCase().includes(input)) {
                            displayTime(city);
                            rightDiv.innerHTML += `<div class="searchContent"><img src=${city.imageUrl}><h3>${city.name}</h3><p>${city.description}</p></div>`;
                        }
                    });
                });

                // Search temples for keyword
                data.temples.forEach(temple => {
                    if (temple.description.toLowerCase().includes(input)) {
                        displayTime(temple);
                        rightDiv.innerHTML += `<div class="searchContent"><img src=${temple.imageUrl}><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
                    } else if (temple.name.toLowerCase().includes(input)) {
                        displayTime(temple);
                        rightDiv.innerHTML += `<div class="searchContent"><img src=${temple.imageUrl}><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
                    }
                });

                // Search beaches for keyword
                data.beaches.forEach(beach => {
                    if (beach.description.toLowerCase().includes(input)) {
                        console.log(beach.description);
                        rightDiv.innerHTML += `<div class="searchContent"><img src=${beach.imageUrl}><h3>${beach.name}</h3><p>${beach.description}</p></div>`;
                    } else if (beach.name.toLowerCase().includes(input)) {
                        console.log(beach.name);
                        rightDiv.innerHTML += `<div class="searchContent"><img src=${beach.imageUrl}><h3>${beach.name}</h3><p>${beach.description}</p></div>`;
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            rightDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function clearSearch() {
    const rightDiv = document.getElementById('rightSide');
    const searchInput = document.getElementById('searchInput');

    rightDiv.innerHTML = "";
    searchInput.value = "";
}

function displayTime(city) {
    const options = { timeZone: `${city.timezone}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const cityTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${city.name}:`, cityTime);
}

searchBtn.addEventListener('click', searchLocations);
clearBtn.addEventListener('click', clearSearch);