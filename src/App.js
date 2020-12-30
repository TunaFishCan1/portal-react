import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [apiResponse, resChange] = useState("");
  const [OS, changeInfo] = useState("");
  const naver = () => {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
    changeInfo(OSName);
    window.open("http://naver.com");
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: "http://naver.com", access: 0, OS: OS }),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  };
  const daum = () => {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
    changeInfo(OSName);
    window.open("https://www.daum.net/");
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: "https://www.daum.net/", access: 0, OS: OS }),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  };
  const nate = () => {
    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
    if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "UNIX";
    if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
    changeInfo(OSName);
    window.open("https://www.nate.com/");
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: "https://www.nate.com/", access: 0, OS: OS }),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{apiResponse}</p>
        <br></br>
        <button type="button" onClick={naver}>
          Naver
        </button>
        <br></br>
        <button type="button" onClick={daum}>
          Daum
        </button>
        <br></br>
        <button type="button" onClick={nate}>
          Nate
        </button>
      </header>
    </div>
  );
}

export default App;
