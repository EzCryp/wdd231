// last modified and current year display
document.getElementById("lastModified").textContent = document.lastModified;
document.getElementById("currentyear").textContent = new Date().getFullYear();

const lastModifiedElement = document.querySelector("#lastModified");
lastModifiedElement.style.color = "#ffd05c";