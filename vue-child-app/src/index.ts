import mount from "./mountApp.js";

import '../../shared-res/styles/global.styl';


const targetElement = document.getElementById('app');
if (targetElement) {
  mount(targetElement);
}
