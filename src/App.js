import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import {
  isAndroid,
  isWinPhone,
  isIOS,
  isMobile,
  mobileVendor,
  mobileModel,
} from "react-device-detect";
function App() {
  const [apiResponse, resChange] = useState("");
  const [OS, changeInfo] = useState("");
  function web(url) {
    var OSName = "Unknown OS";
    if (!isMobile) {
      if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
      if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "UNIX";
      if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
    } else {
      if (isAndroid) OSName = "Android";
      else if (isWinPhone) OSName = "WinPhone";
      else if (isIOS) OSName = "IOS";
    }
    changeInfo(OSName);
    window.open(url);
    var json = { url: url, access: 0, OS: OS };
    if (isMobile) {
      json = {
        manufacturer: mobileVendor,
        model: mobileModel,
        url: url,
        access: 1,
        OS: OS,
      };
    }
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.text())
      .then((res) => resChange(res));
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-intro">{apiResponse}</p>
        <br></br>
        <button type="button" onClick={() => web("http://naver.com")}>
          Naver
        </button>
        <br></br>
        <button type="button" onClick={() => web("https://www.daum.net/")}>
          Daum
        </button>
        <br></br>
        <button type="button" onClick={() => web("https://www.nate.com/")}>
          Nate
        </button>
      </header>
    </div>
  );
}

export default App;
