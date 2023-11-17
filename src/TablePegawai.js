import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Pegawai = () => {
  const [pegawais, setPegawais] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getPegawais();
  }, []);

  const getPegawais = async () => {
    const res = await axios.get("https://corenet.usadi.co.id/BaseAPI/Pegawai");
    setPegawais(res.data);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (formType === "Add") {
      res = await axios.post("https://corenet.usadi.co.id/BaseAPI/Pegawai", formData);
    } else {
      res = await axios.put(`https://corenet.usadi.co.id/BaseAPI/Pegawai/${formData.NIP}`, formData);
    }
    setPegawais([...pegawais, res.data]);
    toggleForm();
  };

  const handleEdit = (pegawai) => {
    setFormType("Edit");
    setFormData(pegawai);
    toggleForm();
  };

  const handleDelete = async (NIP) => {
    await axios.delete(`https://corenet.usadi.co.id/BaseAPI/Pegawai/${NIP}`);
    setPegawais(pegawais.filter((pegawai) => pegawai.NIP !== NIP));
  };

  return (
    <div className="container">
      <h1 className="my-4">Data Pegawai</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>NIP</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pegawais.map((pegawai) => (
            <tr key={pegawai.NIP}>
              <td>{pegawai.NIP}</td>
              <td>{pegawai.Nama}</td>
              <td>{pegawai.Jabatan}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(pegawai)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(pegawai.NIP)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-4" onClick={toggleForm}>
        {formType === "Add" ? "Add Pegawai" : "Close Form"}
      </button>
      {showForm && (
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NIP</label>
            <input type="text" className="form-control" name="NIP" value={formData.NIP || ""} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Nama</label>
            <input type="text" className="form-control" name="Nama" value={formData.Nama || ""} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label>Jabatan</label>
            <input type="text" className="form-control" name="Jabatan" value={formData.Jabatan || ""} onChange={handleFormChange} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Pegawai;
