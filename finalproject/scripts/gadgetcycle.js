const hamburgerBtn = document.querySelector('#ham-btn');
const navlinks = document.querySelectorAll('#nav-bar');
const navMenu = document.querySelector('.navi');

hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navlinks.classList.toggle('open');

  
//   hamburgerBtn.classList.toggle('open');
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