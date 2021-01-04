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
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
const columns = [
  { id: "addr", label: "접속주소", minWidth: 170 },
  { id: "meth", label: "접속방법", minWidth: 100 },
  {
    id: "time",
    label: "접속시각",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("ko-KR"),
  },
  {
    id: "model",
    label: "기종",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("ko-KR"),
  },
  {
    id: "manu",
    label: "제조사",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("ko-KR"),
  },
];
function createData(addr, meth, time, model, manu) {
  return { addr, meth, time, model, manu };
}
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
const publicIp = require("public-ip");
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;

function App() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [apiResponse, resChange] = useState("");
  const [OS, changeInfo] = useState("");
  const [IP, getIP] = useState("");
  const [rows, cArray] = useState([]);
  (async () => {
    getIP(await publicIp.v4());
  })();
  function web(url) {
    var OSName = "Unknown OS";
    if (!isMobile) {
      if (navigator.appVersion.indexOf("Win") !== -1) OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") !== -1) OSName = "MacOS";
      if (navigator.appVersion.indexOf("Linux") !== -1) OSName = "Linux";
    } else {
      if (isAndroid) OSName = "Android";
      else if (isWinPhone) OSName = "WinPhone";
      else if (isIOS) OSName = "IOS";
    }
    changeInfo(OSName);
    window.open(url);
    (async () => {
      getIP(await publicIp.v4());
    })();
    var json = { url: url, access: 0, OS: OS, ip: IP };
    if (isMobile) {
      var json = {
        manufacturer: mobileVendor,
        model: mobileModel,
        url: url,
        access: 1,
        OS: OS,
        ip: IP,
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
  function query() {
    (async () => {
      getIP(await publicIp.v4());
    })();
    var json = { access: 10, ip: IP };
    if (isMobile) {
      json = { access: 11, ip: IP };
    }
    fetch("http://192.168.56.1:9000/testAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((res) => cArray(res.data));
  }
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={() => web("http://naver.com")}>
          Naver
        </button>
        <br></br>
        <button type="button" onClick={() => web("https://www.daum.net")}>
          Daum
        </button>
        <br></br>
        <button type="button" onClick={() => web("https://www.nate.com")}>
          Nate
        </button>
        <br></br>
        <button type="button" onClick={() => query()}>
          사용 내역 검색
        </button>
        <br></br>
        <p className="App-intro" style={{ "font-size": "15px" }}>
          {apiResponse}
        </p>
      </header>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "string"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default App;
