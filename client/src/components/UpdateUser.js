import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAdderess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/getUser/' + id)
      .then(result => {
        setFirstName(result.data.firstName)
        setLastName(result.data.lastName)
        setEmail(result.data.email)
        setStatus(result.data.status)
        setMobile(result.data.mobile)
        setAdderess(result.data.address)
      })
      .catch(err => console.log(err))
  }, [])

  const update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/update/" + id, { firstName, lastName, email, mobile, status, address })
      .then((result) => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="container">
      <h2 className="text-center m-3">Update User</h2>
      <div className="container border rounded shadow p-3">
        <form onSubmit={update}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName" className="mb-1">First Name</label>
              <input
                id="firstName"
                value={firstName}
                type="text"
                placeholder="Enter First Name"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="" className="mb-1">Last Name</label>
              <input
                id="lastName"
                value={lastName}
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
                id="email"
                value={email}
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="" className="mb-1">Mobile</label>
              <input
                id="mobile"
                value={mobile}
                type="number"
                placeholder="Enter Mobile Number"
                className="form-control"
                onChange={(e) => setMobile(e.target.value)}
              />
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
                id="address"
                value={address}
                type="text"
                name="file"
                className="form-control"
                placeholder="Enter Your Location..."
                onChange={(e) => setAdderess(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}
