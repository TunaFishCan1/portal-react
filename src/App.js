import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [apiResponse, resChange] = useState("");

  function callAPI() {
    fetch("http://127.0.1.1:9000/testAPI")
      .then((res) => res.text())
      .then((res) => resChange(res));
  }

  function respond() {
    fetch("http://127.0.1.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "johnny" }),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  }
  const naver = () => {
    let path = `https://www.naver.com/`;
    history.push(path);
  };
  useEffect(() => {
    callAPI();
    respond();
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{apiResponse}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <br></br>
          <button type="button" onClick={this.naver}>
            Naver
          </button>
          <br></br>
          <button type="button">Daum</button>
          <br></br>
          <button type="button">Nate</button>
        </a>
      </header>
    </div>
  );
}

export default App;
