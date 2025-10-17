import { gadgets } from "../data/gadgets.mjs";

// GADGETS
const gadgetDiv = document.querySelector("#allgadgets");

function displayItems(gadgets) {
  gadgetDiv.innerHTML = "";
  gadgets.forEach(gadget => {
    const gadgetCards =`
      <div class="gadget">
        <figure class="photo">
            <img src="${gadget.image}" alt="${gadget.model}" loading="lazy"/>
          </figure>
          <h2 class="gadgetModel">${gadget.model}</h2>
          <p class="gadgetPrice">${gadget.price}</p>
          <p class="gadgetCondition">${gadget.condition}</p>
          <button class="button">Learn More</button>
      </div>`;
    gadgetDiv.innerHTML += gadgetCards;
  });
}

displayItems(gadgets);



const url = '../data/gadgets.json';

const cards = document.querySelector('.gadget-card');

async function getGadgetData() {
    const response = await fetch(url);
    const data = await response.json();

    displayGadgets(data.gadgets);
}

getGadgetData();

const displayGadgets = (gadgets) => {
    gadgets.forEach(gadget => {

        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const portrait = document.createElement('img');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname} - ${prophet.order}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
}