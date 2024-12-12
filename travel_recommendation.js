const teamMembers = document.getElementById('ourTeam');
teamMembers.innerHTML = "";
function listTeam() {
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