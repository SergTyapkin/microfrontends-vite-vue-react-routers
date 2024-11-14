import mount from "~/mountApp";

import '../../shared-res/styles/global.styl';


const targetElement = document.getElementById('app');
if (targetElement) {
  mount(targetElement);
}
