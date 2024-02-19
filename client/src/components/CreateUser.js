import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAdderess] = useState("");
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  const file = "";

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/create", { firstName, lastName, email, mobile, gender, status, file, address })
      .then((result) => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="container">
      <h2 className="text-center m-3">Register Your Details</h2>
      <div className="container border rounded shadow p-3">
        <form onSubmit={submit}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName" className="mb-1">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="" className="mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="" className="mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="" className="mb-1">Mobile</label>
              <input
                type="number"
                placeholder="Enter Mobile Number"
                className="form-control"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <div>
                <label htmlFor="" className="mb-1">Select your Gender</label>
                <div className="form-check">
                  <input className="form-check-input" value="M" type="radio" name="gender" id="male" onChange={(e) => setGender(e.target.value)} />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" value="F" type="radio" name="gender" id="female" onChange={(e) => setGender(e.target.value)} />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="col">
              <label htmlFor="" className="mb-1 d-block">Select Your Status</label>
              <select onChange={(e) => setStatus(e.target.value)} className="w-100 p-1">
                <option disabled selected>Select...</option>
                <option>Active</option>
                <option>InActive</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="" className="mb-1">Profile</label>
              <input
                type="file"
                name="file"
                className="form-control"
              />
            </div>
            <div className="col">
              <label htmlFor="" className="mb-1">Select Your Location</label>
              <input
                type="text"
                name="file"
                className="form-control"
                placeholder="Enter Your Location..."
                onChange={(e) => setAdderess(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}
