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

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const keyword = data.find(item => item === input);
            
            if (keyword) {
                rightDiv.innerHTML += `<ul><li><h2>${keyword.id[0].name}</h2>`;
                rightDiv.innerHTML += `</li></ul>`;
            } else {
                rightDiv.innerHTML = `${keyword} not found.`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            rightDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

searchBtn.addEventListener('click', searchLocations);