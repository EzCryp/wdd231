// JSON file: chamber/scripts/directory.js
// This script fetches business data from a JSON file and displays it in a grid or list
// format on the Chamber of Commerce directory page.
const membersUrl = 'data/members.json';
const memberListCon = document.querySelector('#memberList');
// nav button toggle
const gridButton = document.querySelector('.grid-button');
const listButton = document.querySelector('.list-button');

// fetch business data
// This function fetches the business data from the JSON file and returns it as a promise.
// It uses async/await for better readability and error handling.
// If the fetch fails, it logs an error to the console.
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
displayBusinessCards(members, memberListCon)
});


// const displayBusinessCards = (memberlist) => {
//     memberlist.forEach(members => {

//         const memberListCon = document.createElement('section');
//         const businessName = document.createElement('h2');
//         const pic = document.createElement('img');
//         const memberAddress = document.createElement('p');
//         const memberNumber = document.createElement('p');
//         const membersUrl = document.createElement('a');
        

//         businessName.textContent = `${members.name}`;

//         pic.setAttribute('src', members.image);
//         pic.setAttribute('alt', `${members.name} logo`);
//         pic.setAttribute('loading', 'lazy');
//         pic.setAttribute('width', '340');
//         pic.setAttribute('height', '440');

//         memberAddress.textContent = `Address: ${members.address}`;
//         memberPhone.textContent = `Phone: ${memberss.number}`;

//         membersUrl.setAttribute('href', members.website);
//         membersUrl.setAttribute('target', '_blank');
//         membersUrl.textContent = `Visit ${members.name} Website`;

//         memberListCon.appendChild(businessName);
//         memberListCon.appendChild(pic);
//         memberListCon.appendChild(memberAddress);
//         memberListCon.appendChild(memberNumber);
//         memberListCon.appendChild(membersUrl);

//         memberCardCon.appendChild(memberListCon);
//     });
// } 

// display Business Card
function displayBusinessCards(memberList, elementCon) {
	elementCon.innerHTML = "";
	memberList.forEach((member) => {
		const memberCards = 
            `<section id="cards" class="b-cards">
				
                <h2 class="business-name">${member.name}</h2>
				
                <div class="logo-container"><img class="pic" src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="100"></div>
                
                <div class="contact-info">
                    <p class="address">${member.address}</p>
                    <p class="number">${member.number}</p>
                </div>
                
                <div class="member-url">
                    <a class="site" href="${member.website}" target="_blank">${member.name}</a>
                </div>

			</section>`;

		elementCon.innerHTML += memberCards;
	});
}

// business card grid view
gridButton.addEventListener('click', () => {
    const memberListCon = document.querySelector('#memberList');
    const logoContainers = document.querySelectorAll('.logo-container');
    const membersUrl = document.querySelectorAll('.member-url');

    logoContainers.forEach(container => {container.style.display = 'flex';});
    membersUrl.forEach(container => {container.style.display = 'flex';});
    
    memberListCon.classList.remove('list');
    listButton.classList.remove('activeButton');
    gridButton.classList.add('activeButton');
    memberListCon.classList.add('grid');
    membersUrl.classList.add('grid');
})

// business card list view 
listButton.addEventListener('click', () => {
    const memberListCon = document.querySelector('#memberList');
    const logoContainers = document.querySelectorAll('.logo-container');
    const membersUrl = document.querySelectorAll('.member-url');
    
    logoContainers.forEach(container => {container.style.display = 'none';});
    membersUrl.forEach(container => { container.style.display = 'none';});

    console.log('list button clicked');
    memberListCon.classList.remove('grid');
    memberListCon.classList.add('list');
    gridButton.classList.remove('activeButton');
    listButton.classList.add('activeButton');
    membersUrl.classList.add('activeButton');
})
// End of chamber/scripts/directory.js
// This script fetches business data from a JSON file and displays it in a grid or list
// format on the Chamber of Commerce directory page.
// It also includes functionality to toggle between grid and list views.
// The script uses async/await for fetching data and dynamically generates HTML content
// based on the fetched data. The buttons for toggling views are also handled with event listeners

