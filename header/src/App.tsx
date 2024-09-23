import React from "react";
import './App.css'

const App = ({caption = "default text"}) => (
    <div>
        <h1>Header</h1>
        <i>(Component 1 React)</i>
        <div>{ caption }</div>
    </div>
)

export default App
