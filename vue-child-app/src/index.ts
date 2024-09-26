import mount from "./mountApp.js";
import '~/styles/global.styl';

const targetElement = document.getElementById('app');
if (targetElement) {
  mount(targetElement);
}
