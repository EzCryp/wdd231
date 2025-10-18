// import { gadgets } from "data/gadgets.mjs";

// // gadgets
// const gadgetDiv = document.querySelector("#all-gadgets");

// function displayItems(gadgets) {
//   gadgetDiv.innerHTML = "";
//   gadgets.forEach(gadget => {
//     const gadgetCards =`
//       <div class="gadgetCon">
//         <figure class="photo">
//           <img src="${gadget.imageUrl}" alt="${gadget.model}" loading="lazy" />
//         </figure>
//         <h2 class="gadgetModel">${gadget.model}</h2>
//         <p class="gadgetBrand">${gadget.brand}</p>
//         <p class="gadgetCondition">${gadget.condition}</p>
//         <p class="gadgetPrice">${gadget.price}</p>
//         <button class="button"><a href="order.html">Add to Cart</a></button>
//       </div>`;
//     gadgetDiv.innerHTML += gadgetCards;
//   });
// }

// displayItems(gadgets)



// Fetching gadget data and displaying spotlight gadgets
const url = 'data/gadgets.json';

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
        const gadgetModel = document.createElement('h4');
        const gadgetCondition = document.createElement('p');
        const gadgetPrice = document.createElement('p');
        const photo = document.createElement('img');

        gadgetModel.textContent = `${gadget.model}`;
        gadgetCondition.textContent = `Condition: ${gadget.condition}`;
        gadgetPrice.textContent = `Price: ${gadget.price}`;

        photo.setAttribute('src', gadget.image);
        // photo.setAttribute('alt', `${gadget.model} - ${gadget.brand}`);
        photo.setAttribute('loading', 'lazy');
        photo.setAttribute('width', '340');
        photo.setAttribute('height', '440');

        
        card.appendChild(gadgetCondition);
        card.appendChild(gadgetPrice);
        card.appendChild(photo);
        card.appendChild(gadgetModel);

        cards.appendChild(card);
    });
}