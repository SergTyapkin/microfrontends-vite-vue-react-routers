import './App.styl'
import getExportMountFunction from "../exportUtils.js";
// @ts-ignore
import ImgReactLogo from '/res/react.svg';

const App = ({caption = "default text"}) => (
  <div className="root-react-app">
    <h1>React component <img src={ImgReactLogo} alt="react logo" className="logo"/></h1>
    <div>Prop "caption" value: {caption}</div>
  </div>
);

export const mount = getExportMountFunction(App);

export default App;
