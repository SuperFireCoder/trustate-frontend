import React from "react";
import "./App.css";
import { Customers } from "./containers/Customer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>CUSTOMERS</h2>
      </header>
      <Customers />
    </div>
  );
}

export default App;
