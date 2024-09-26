import './App.css'
import ImgReactLogo from '/res/react.svg';
import getExportMountFunction from "~/exportUtils.ts";

const App = ({caption = "default text"}) => (
  <div className="root">
    <h1>React component <img src={ImgReactLogo} alt="react logo" className="logo"/></h1>
    <div>Prop "caption" value: {caption}</div>
  </div>
);

export const mount = getExportMountFunction(App);

export default App;
