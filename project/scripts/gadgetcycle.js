const hamburgerBtn = document.querySelector('#ham-btn');
const navMenu = document.querySelector('.navi');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open');

});


// // Sample data for listings
// const sampleListings = [
//   {id:1,brand:'Apple',model:'iPhone 14',cond:'like-new',price:799,thumb:'📱',verified:true,added:'2025-07-05'},
//   {id:2,brand:'Samsung',model:'Galaxy S21',cond:'good',price:699,thumb:'📱',verified:true,added:'2025-06-28'},
//   {id:3,brand:'Google',model:'Pixel 6',cond:'fair',price:599,thumb:'📱',verified:false,added:'2025-05-13'},
//   {id:4,brand:'OnePlus',model:'9 Pro',cond:'like-new',price:899,thumb:'📱',verified:true,added:'2025-07-20'},
//   {id:5,brand:'Sony',model:'Xperia 1 III',cond:'good',price:999,thumb:'📱',verified:true,added:'2025-06-02'},
//   {id:6,brand:'Xiaomi',model:'Mi 11',cond:'fair',price:499,thumb:'📱',verified:false,added:'2025-04-15'}
// ];

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
