// nav button toggle
const navButton = document.querySelector('.nav-button');
const navList = document.querySelector('.navi');


navButton.addEventListener('click', () => {
navButton.classList.toggle('close');
navList.classList.toggle('show');
}, false);

window.onresize = () => { if (window.innerWidth > 1200) 
navList.classList.remove('show'); 
navButton.classList.remove('close');
}