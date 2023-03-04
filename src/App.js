import React from "react";
import "./App.css";
import Slider from "./slider/Slider";

function App() {
  return (
    <div className="App">
      <Slider min={0} max={99} />
    </div>
  );
}

export default App;
