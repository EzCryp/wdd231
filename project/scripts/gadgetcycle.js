// Hamburger menu functionality
const hamburgerBtn = document.querySelector('#ham-btn');
const navMenu = document.querySelector('.navi');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open');

});


// Modal functionality
const learnMoreButtons = document.querySelectorAll(".learn-more-button");
const closeModalButtons = document.querySelectorAll(".close-modal-button");

learnMoreButtons.forEach(learnMoreButton => {
    learnMoreButton.addEventListener("click", () => {
        const level = learnMoreButton.dataset.id;
        showModal(level)
    });
});

closeModalButtons.forEach(closeModalButton => {
    closeModalButton.addEventListener("click", () => {
        const level = closeModalButton.dataset.modalId;
        hideModal(level);
    });
});

function showModal(level) {
    const modal = document.querySelector(`#tier-${level}`);
    modal.showModal();
}

function hideModal(level) {
    const modal = document.querySelector(`#tier-${level}`);
    modal.close();
}


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

// Spotlight Businesses
// Fetching business data and displaying spotlight businesses
const gadgetCon = document.querySelector('.gadgetspotlight');
const gadgetsUrl = 'data/gadgets.json';

async function getGadgetData() {
    try {
        const response = await fetch(gadgetsUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.gadgets;
    }
    catch(error) {
        console.error("Error fetching gadget data:", error);
    }

}

getGadgetData().then((gadgets) => {
    const qualified = gadgets.filter(gadget =>
      gadget.tier === 'Gold' || gadget.tier === 'Silver'
    );
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
  displayBusinessCards(selected, gadgetCon);
})


function displayBusinessCards(gadgetList,elementCon) {
    elementCon.innerHTML = "";
    gadgetList.forEach((gadget) => {
        const gadgetCards = `<div id="cards" class="business-card">
                <div class="bname">
                    <h3 class="b-name">${gadget.name}</h3>
                    <span class="mem-level">${gadget.gadgetship}</span>
                </div>
                <div class="mem-info">
                    <img src="images/${gadget.image}" alt="${gadget.name}">
                    <div class="mem-details">
                        <ul>
                            <li><span class="info-label"></span><span class="mem-email">${ gadget.address}</span></li>
                            <li><span class="info-label"></span><span class="mem-phone">${ gadget.number}</span></li>
                            <li><span class="info-label"></span><a href="${gadget.website}" class="mem-url">${ gadget.name}</a></li>
                        </ul>
                    </div>
                </div>
                
            </div>`;
        elementCon.innerHTML += gadgetCards;
    });
}