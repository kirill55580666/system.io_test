import React, { type ReactElement } from "react";
import "./App.css";
import { MainPage } from "./pages/Main";

function App(): ReactElement {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
