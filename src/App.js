import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TablePegawai from "./TablePegawai";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table-pegawai" element={<TablePegawai />} />
      </Routes>
    </Router>
  );
};

export default App;
