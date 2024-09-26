import mount from "./mountApp.js";

const targetElement = document.getElementById('app');
console.log(targetElement)
if (targetElement) {
  mount(targetElement);
}
