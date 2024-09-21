import React from "react";
import './App.css'

const App = ({caption = "default text"}) => (
    <div>
        <h1>Header</h1>
        <i>(Component 1)</i>
        <b>{ caption }</b>
    </div>
)

export default App
