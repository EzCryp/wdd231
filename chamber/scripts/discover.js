import { places } from "../data/places.mjs";

// PLACES
const placeDiv = document.querySelector("#allplaces");

function displayItems(places) {
  placeDiv.innerHTML = "";
  places.forEach(place => {
    const placeCards =`
      <div class="place">
        <figure class="photo">
            <img src="${place.imageUrl}" alt="${place.name}" loading="lazy" />
          </figure>
          <h2 class="placeName">${place.name}</h2>
          <address class="address">${place.address}</address>
          <p class="placeDesc">${place.description}</p>
          <button class="button">Learn More</button>
      </div>`;
    placeDiv.innerHTML += placeCards;
  });
}

displayItems(places)

// visit message box
document.addEventListener("DOMContentLoaded", () => {
  const visitBox = document.getElementById("welcome-box");
  const visitText = document.getElementById("visit-msg");
  const closeBtn = document.getElementById("close-visit-message");

  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const msInDay = 1000 * 60 * 60 * 24;
    const daysBetween = Math.floor((now - parseInt(lastVisit)) / msInDay);

    if (daysBetween < 1) {
      message = "Welcome Back!";
    } else if (daysBetween === 1) {
      message = "You're back! You last visited 1 day ago.";
    } else {
      message = `Welcome Back! You last visited ${daysBetween} days ago.`;
    }
  } 

  visitText.textContent = message;
  visitBox.classList.remove("hidden");

  localStorage.setItem("lastVisit", now.toString());

  closeBtn.addEventListener("click", () => {
    visitBox.classList.add("hidden");
  });
});