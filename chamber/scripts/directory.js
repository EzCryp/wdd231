// constants for the directory script
// This script fetches business data from a JSON file and displays it in a grid or list
// format on the Chamber of Commerce directory page.
const membersUrl = 'data/members.json';
const memberListCon = document.querySelector('#memberList');
const gridButton = document.querySelector('.grid-button');
const listButton = document.querySelector('.list-button');


async function getBusinessData() {
	try {
		const response = await fetch(membersUrl);
		if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

		const data = await response.json();
		return data.members;
	}
	catch(error) {
		console.error("Error fetching business data:", error);
	}

}

getBusinessData().then((members) => {
  displayBusinessCards(members, memberListCon);
})

function displayBusinessCards(memberList,elementCon) {
	elementCon.innerHTML = "";
	memberList.forEach((member) => {
		const memberCards = `<section id="cards" class="b-cards">
				<h2 class="business-name">${member.name}</h2>
				<div class="logo-container"><img class="pic" src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100"></div>
				<p class="address">${member.address}</p>
				<p class="number">${member.number}</p>
				<a class="site" href="${member.website}" target="_blank">${member.name}</a>
			</section>`;
		elementCon.innerHTML += memberCards;
	});
}

gridButton.addEventListener('click', () => {
   const memberListCon = document.querySelector('#memberList');
   const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(container => {
        container.style.display = 'flex';
    });
    memberListCon.classList.remove('list');
    listButton.classList.remove('activeButton');
    gridButton.classList.add('activeButton');
    memberListCon.classList.add('grid');
})

listButton.addEventListener('click', () => {
    const memberListCon = document.querySelector('#memberList');
    const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(container => {
        container.style.display = 'none';
    });
    console.log('list button clicked');
    memberListCon.classList.remove('grid');
    memberListCon.classList.add('list');
    gridButton.classList.remove('activeButton');
    listButton.classList.add('activeButton');

})
// End of chamber/scripts/directory.js
// This script fetches business data from a JSON file and displays it in a grid or list
// format on the Chamber of Commerce directory page.
// It also includes functionality to toggle between grid and list views.
// The script uses async/await for fetching data and dynamically generates HTML content
// based on the fetched data. The buttons for toggling views are also handled with event listeners

// last modified and current year display
document.getElementById("lastModified").textContent = document.lastModified;

document.getElementById("currentyear").textContent = new Date().getFullYear();

const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.style.color = "#ffd05c";

// nav button toggle
const navButton = document.querySelector('.nav-button');
const navList = document.querySelector('.navi');


navButton.addEventListener('click', () => {
  navButton.classList.toggle('close');
  navList.classList.toggle('show');
}, false);

window.onresize = () => { if (window.innerWidth > 760) 
  navList.classList.remove('show'); 
  navButton.classList.remove('close');
}